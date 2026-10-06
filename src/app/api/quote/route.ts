import { NextResponse } from 'next/server';
import { site } from '@/lib/site';
import {
  labelForArea,
  labelForService,
  normalizeQuote,
  validateQuote,
  type QuotePayload,
} from '@/lib/quote';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Quote request handler.
 *
 * Delivery is tried in this order, using whichever env vars are set in Vercel:
 *   1. RESEND_API_KEY + QUOTE_NOTIFY_EMAIL  → email to Stephanie
 *   2. QUOTE_WEBHOOK_URL                    → Zapier / Make / GHL / n8n
 *   3. Neither                              → logged to the Vercel function log
 *
 * With nothing configured the form still succeeds and the lead lands in the
 * logs, so a missing env var never costs a lead. See README.md.
 */

/* ───────────────── Lightweight per-IP rate limit ─────────────────
 * In-memory, so it resets on cold start and is not shared between regions.
 * Enough to stop a bot hammering the endpoint; not a substitute for a WAF.
 * ──────────────────────────────────────────────────────────────── */
const hits = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 8;

function recentCount(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length > 0) hits.set(ip, recent);
  else hits.delete(ip);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length;
}

/**
 * Counted only once a submission has passed validation (or been caught as a
 * bot). A typo in an email address is not an abuse signal, and counting those
 * would lock a real person out mid-correction — which matters more than usual
 * here because an office or a household behind one NAT shares an address.
 */
function recordHit(ip: string) {
  hits.set(ip, [...(hits.get(ip) ?? []), Date.now()]);
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildEmail(data: QuotePayload) {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Area', labelForArea(data.area)],
    ['Neighbourhood', data.neighbourhood || '—'],
    ['Services', data.services.map(labelForService).join(', ')],
    ['Bedrooms', data.bedrooms || '—'],
    ['Bathrooms', data.bathrooms || '—'],
    ['Frequency', data.frequency || '—'],
    ['Timing', data.timing || '—'],
    ['Pets', data.pets || '—'],
    ['Notes', data.notes || '—'],
    ['Came from', data.sourcePath || '/'],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:18px">New quote request</h2>
      <p style="margin:0 0 18px;color:#6a6a62;font-size:13px">${site.name}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:7px 12px 7px 0;color:#6a6a62;vertical-align:top;white-space:nowrap">${esc(k)}</td>
              <td style="padding:7px 0;color:#1b1b19">${esc(v)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <p style="margin:20px 0 0">
        <a href="tel:${esc(data.phone)}" style="color:#3c6851">Call ${esc(data.name)}</a> ·
        <a href="mailto:${esc(data.email)}" style="color:#3c6851">Reply by email</a>
      </p>
    </div>`;

  return { text, html, subject: `Quote request — ${data.name}, ${labelForArea(data.area)}` };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (recentCount(ip) >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests in a short time.' },
      { status: 429 },
    );
  }

  let data: QuotePayload;
  try {
    // normalizeQuote coerces every field, so a body with the right JSON shape
    // but the wrong types (name as a number, services as an object) is handled
    // as invalid input rather than throwing past the handler as a 500.
    data = normalizeQuote(await request.json());
  } catch {
    return NextResponse.json({ ok: false, message: 'Malformed request.' }, { status: 400 });
  }

  // Honeypot filled, or submitted faster than a person can read the form.
  // Return 200 so bots get no useful signal about why it failed.
  if (data.website || (typeof data.elapsedMs === 'number' && data.elapsedMs < 2500)) {
    recordHit(ip);
    return NextResponse.json({ ok: true });
  }

  const { errors, valid } = validateQuote(data);
  if (!valid) {
    // Deliberately not counted — see recordHit above.
    return NextResponse.json(
      { ok: false, message: 'Some details need fixing.', errors },
      { status: 422 },
    );
  }

  // Trim and cap every string so an oversized payload cannot be forwarded on.
  const clean: QuotePayload = {
    ...data,
    name: data.name.trim().slice(0, 120),
    email: data.email.trim().slice(0, 160),
    phone: data.phone.trim().slice(0, 40),
    neighbourhood: (data.neighbourhood ?? '').trim().slice(0, 120),
    pets: (data.pets ?? '').trim().slice(0, 200),
    notes: (data.notes ?? '').trim().slice(0, 2000),
    services: data.services.slice(0, 10),
  };

  recordHit(ip);

  const { subject, text, html } = buildEmail(clean);
  const notifyTo = process.env.QUOTE_NOTIFY_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.QUOTE_WEBHOOK_URL;

  let delivered = false;

  if (resendKey && notifyTo) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Must be a domain verified in Resend.
          from: process.env.QUOTE_FROM_EMAIL ?? `quotes@${new URL(site.url).hostname}`,
          to: [notifyTo],
          reply_to: clean.email,
          subject,
          text,
          html,
        }),
      });
      delivered = res.ok;
      if (!res.ok) console.error('[quote] Resend rejected the send:', await res.text());
    } catch (err) {
      console.error('[quote] Resend request failed:', err);
    }
  }

  if (!delivered && webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...clean, subject, receivedAt: new Date().toISOString() }),
      });
      delivered = res.ok;
      if (!res.ok) console.error('[quote] Webhook rejected the post:', res.status);
    } catch (err) {
      console.error('[quote] Webhook request failed:', err);
    }
  }

  if (!delivered) {
    // Last resort: the lead is still captured in the Vercel function log.
    console.warn('[quote] No delivery channel configured. Lead follows:\n' + text);
  }

  return NextResponse.json({ ok: true });
}
