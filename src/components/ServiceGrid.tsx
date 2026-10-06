import Link from 'next/link';
import { services } from '@/lib/services';
import ServiceIcon from './ServiceIcon';

export default function ServiceGrid({
  /** Omit a service by slug, e.g. on its own page. */
  exclude,
  limit,
  /** Pass 'h2' when this sits directly under the page h1, to avoid a skip. */
  headingAs: Heading = 'h3',
}: {
  exclude?: string;
  limit?: number;
  headingAs?: 'h2' | 'h3';
}) {
  const list = services.filter((s) => s.slug !== exclude).slice(0, limit ?? services.length);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-lift"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-50 text-sage-600">
              <ServiceIcon name={s.icon} />
            </span>
            <Heading className="mt-4 font-sans text-[1.0625rem] font-semibold text-ink-900">
              {s.name}
            </Heading>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{s.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700">
              What it covers
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
