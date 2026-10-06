'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site, telHref } from '@/lib/site';
import {
  areaOptions,
  bathroomOptions,
  bedroomOptions,
  frequencyOptions,
  serviceOptions,
  timingOptions,
  validateQuote,
  type QuotePayload,
} from '@/lib/quote';

const STEPS = ['What you need', 'About the home', 'How to reach you'] as const;

const emptyForm: QuotePayload = {
  services: [],
  area: '',
  neighbourhood: '',
  bedrooms: '',
  bathrooms: '',
  frequency: '',
  timing: '',
  pets: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
  website: '',
};

export default function QuoteForm({
  /** Preselect a service when the form sits on a service page. */
  defaultService,
  /** Preselect an area when the form sits on an area page. */
  defaultArea,
}: {
  defaultService?: string;
  defaultArea?: string;
}) {
  const pathname = usePathname();
  const mountedAt = useRef(Date.now());
  const headingRef = useRef<HTMLParagraphElement>(null);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuotePayload>({
    ...emptyForm,
    services: defaultService ? [defaultService] : [],
    area: defaultArea ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  // Move focus to the step heading on change so screen readers and keyboard
  // users are not left at the bottom of the previous step.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const toggleService = (slug: string) => {
    set(
      'services',
      form.services.includes(slug)
        ? form.services.filter((s) => s !== slug)
        : [...form.services, slug],
    );
  };

  /** Only validate the fields belonging to the current step. */
  const validateStep = () => {
    const { errors: all } = validateQuote(form);
    const keysByStep: string[][] = [['services', 'area'], [], ['name', 'email', 'phone']];
    const relevant = Object.fromEntries(
      Object.entries(all).filter(([k]) => keysByStep[step].includes(k)),
    );
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { errors: all, valid } = validateQuote(form);
    if (!valid) {
      setErrors(all);
      // Jump back to the first step that has a problem.
      if (all.services || all.area) setStep(0);
      else setStep(2);
      return;
    }

    setState('sending');
    setServerError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          elapsedMs: Date.now() - mountedAt.current,
          sourcePath: pathname,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(body.message || 'That did not go through.');
      }

      setState('done');
    } catch (err) {
      setState('error');
      setServerError(err instanceof Error ? err.message : 'That did not go through.');
    }
  };

  /* ─────────────────────────── SUCCESS STATE ─────────────────────────── */
  if (state === 'done') {
    return (
      <div className="rounded-3xl border border-sage-200 bg-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage-50 text-sage-600">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path d="M5 13l4 4 10-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 text-[1.5rem] font-semibold">That is with {site.founder.firstName}</h3>
        <p className="mx-auto mt-3 max-w-md text-[1.0625rem] leading-relaxed text-ink-600">
          She reads these herself and usually replies the same day, next morning at the latest. If
          you need an answer sooner than that, calling is faster.
        </p>
        <a href={telHref} className="btn-secondary mt-6">
          {site.phone}
        </a>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 transition focus:outline-none focus:ring-2 focus:ring-sage-500/60';
  const inputCls = (field: string) =>
    `${inputBase} ${errors[field] ? 'border-red-400' : 'border-ink-200 focus:border-sage-400'}`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-ink-100 bg-white p-6 shadow-lift sm:p-8"
    >
      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between gap-3">
          <p
            ref={headingRef}
            tabIndex={-1}
            className="font-sans text-[1.0625rem] font-semibold text-ink-900 focus:outline-none"
          >
            {STEPS[step]}
          </p>
          <p className="shrink-0 text-[0.8125rem] text-ink-500">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <div
          className="mt-3 flex gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Quote request progress"
        >
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-sage-500' : 'bg-ink-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ───────────────────────── STEP 1 ───────────────────────── */}
      {step === 0 && (
        <div className="space-y-6 animate-fade-up">
          <fieldset>
            <legend className="text-sm font-semibold text-ink-900">
              What do you need help with?
            </legend>
            <p className="mt-1 text-[0.8125rem] text-ink-500">Pick as many as apply.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {serviceOptions.map((o) => {
                const active = form.services.includes(o.value);
                return (
                  <label
                    key={o.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[0.9375rem] transition ${
                      active
                        ? 'border-sage-400 bg-sage-50 text-ink-900'
                        : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleService(o.value)}
                      className="h-4 w-4 rounded border-ink-300 text-sage-600 focus:ring-sage-500"
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
            {errors.services && (
              <p className="mt-2 text-[0.8125rem] text-red-600" role="alert">
                {errors.services}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="q-area" className="block text-sm font-semibold text-ink-900">
              Where is the home?
            </label>
            <select
              id="q-area"
              value={form.area}
              onChange={(e) => set('area', e.target.value)}
              className={`${inputCls('area')} mt-2`}
            >
              <option value="">Choose an area</option>
              {areaOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors.area && (
              <p className="mt-2 text-[0.8125rem] text-red-600" role="alert">
                {errors.area}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="q-hood" className="block text-sm font-semibold text-ink-900">
              Neighbourhood <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <input
              id="q-hood"
              type="text"
              value={form.neighbourhood}
              onChange={(e) => set('neighbourhood', e.target.value)}
              placeholder="Ocean Park, East Beach, Morgan Creek…"
              className={`${inputBase} mt-2 border-ink-200 focus:border-sage-400`}
            />
          </div>
        </div>
      )}

      {/* ───────────────────────── STEP 2 ───────────────────────── */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-up">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="q-beds" className="block text-sm font-semibold text-ink-900">
                Bedrooms
              </label>
              <select
                id="q-beds"
                value={form.bedrooms}
                onChange={(e) => set('bedrooms', e.target.value)}
                className={`${inputBase} mt-2 border-ink-200 focus:border-sage-400`}
              >
                <option value="">Select</option>
                {bedroomOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="q-baths" className="block text-sm font-semibold text-ink-900">
                Bathrooms
              </label>
              <select
                id="q-baths"
                value={form.bathrooms}
                onChange={(e) => set('bathrooms', e.target.value)}
                className={`${inputBase} mt-2 border-ink-200 focus:border-sage-400`}
              >
                <option value="">Select</option>
                {bathroomOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-ink-900">How often?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {frequencyOptions.map((o) => (
                <label
                  key={o.value}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[0.875rem] transition ${
                    form.frequency === o.value
                      ? 'border-sage-400 bg-sage-50 font-medium text-ink-900'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={o.value}
                    checked={form.frequency === o.value}
                    onChange={(e) => set('frequency', e.target.value)}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-ink-900">When do you need it?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {timingOptions.map((o) => (
                <label
                  key={o.value}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[0.875rem] transition ${
                    form.timing === o.value
                      ? 'border-sage-400 bg-sage-50 font-medium text-ink-900'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="timing"
                    value={o.value}
                    checked={form.timing === o.value}
                    onChange={(e) => set('timing', e.target.value)}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="q-pets" className="block text-sm font-semibold text-ink-900">
              Pets in the home? <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <input
              id="q-pets"
              type="text"
              value={form.pets}
              onChange={(e) => set('pets', e.target.value)}
              placeholder="One dog, friendly but loud"
              className={`${inputBase} mt-2 border-ink-200 focus:border-sage-400`}
            />
          </div>
        </div>
      )}

      {/* ───────────────────────── STEP 3 ───────────────────────── */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-up">
          <div>
            <label htmlFor="q-name" className="block text-sm font-semibold text-ink-900">
              Your name
            </label>
            <input
              id="q-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={`${inputCls('name')} mt-2`}
            />
            {errors.name && (
              <p className="mt-2 text-[0.8125rem] text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="q-email" className="block text-sm font-semibold text-ink-900">
                Email
              </label>
              <input
                id="q-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={`${inputCls('email')} mt-2`}
              />
              {errors.email && (
                <p className="mt-2 text-[0.8125rem] text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="q-phone" className="block text-sm font-semibold text-ink-900">
                Phone
              </label>
              <input
                id="q-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                className={`${inputCls('phone')} mt-2`}
              />
              {errors.phone && (
                <p className="mt-2 text-[0.8125rem] text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="q-notes" className="block text-sm font-semibold text-ink-900">
              Anything she should know?{' '}
              <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <textarea
              id="q-notes"
              rows={4}
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Possession date is the 30th, the place is empty. Hard water on the shower glass is the main thing."
              className={`${inputBase} mt-2 resize-y border-ink-200 focus:border-sage-400`}
            />
          </div>

          {/* Honeypot. Hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="q-website">Website</label>
            <input
              id="q-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
            />
          </div>

          <p className="text-[0.75rem] leading-relaxed text-ink-500">
            Your details go straight to {site.founder.firstName} and are used to reply to this
            request. No list, no sharing, no automated follow-up.
          </p>
        </div>
      )}

      {/* ───────────────────────── Controls ───────────────────────── */}
      {state === 'error' && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-[0.875rem] text-red-700" role="alert">
          {serverError} You can also call {site.phone} and reach her directly.
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={back} className="btn-ghost !px-4">
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary ml-auto">
            Continue
          </button>
        ) : (
          <button type="submit" disabled={state === 'sending'} className="btn-primary ml-auto">
            {state === 'sending' ? 'Sending…' : 'Send the request'}
          </button>
        )}
      </div>
    </form>
  );
}
