import Link from 'next/link';
import Image from 'next/image';
import { site, telHref } from '@/lib/site';

/**
 * Page hero. `heading` is rendered as the H1, so every page passes its own
 * keyword-bearing headline rather than reusing a generic one.
 */
export default function Hero({
  eyebrow,
  heading,
  sub,
  image = '/images/hero-white-rock.jpg',
  imageAlt,
  bullets,
  primaryCta = { href: '/#quote', label: 'Get a quote' },
}: {
  eyebrow?: string;
  heading: string;
  sub: string;
  image?: string;
  imageAlt: string;
  bullets?: string[];
  primaryCta?: { href: string; label: string };
}) {
  return (
    <div className="relative overflow-hidden bg-sand-50">
      {/* Soft background wash, decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sage-100/50 blur-3xl"
      />
      <div className="container-page relative py-12 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-14">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem] lg:text-[3.1rem]">
              {heading}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-600 sm:text-[1.15rem]">
              {sub}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[0.95rem] text-ink-700">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-[3px] h-4 w-4 shrink-0 text-sage-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </Link>
              <a href={telHref} className="btn-secondary">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path
                    d="M4.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.65 1.49A15.5 15.5 0 0 1 3 6.15 1.5 1.5 0 0 1 4.5 4.5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {site.phone}
              </a>
            </div>

            <p className="mt-4 text-[0.8125rem] text-ink-500">
              {site.hoursLabel} · {site.rate.rangePerHour} · No travel charge in{' '}
              {site.baseCity} or South Surrey
            </p>
          </div>

          {/* Hero image. priority + sizes keep LCP fast on mobile. */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-ink-100 bg-sand-100 shadow-lift">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-card sm:block lg:-left-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sage-600">
                Owner-operated
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink-900">{site.founder.name}</p>
              <p className="text-[0.8125rem] text-ink-500">{site.baseCity}, BC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
