import Link from 'next/link';
import Image from 'next/image';
import { areas } from '@/lib/areas';

export default function AreaCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {areas.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/${a.slug}`}
            className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-lift"
          >
            <div className="relative aspect-[16/9] bg-sand-100">
              <Image
                src={a.image}
                alt={`A ${a.city} home left clean at the end of a visit from The Clean Technique`}
                fill
                sizes="(max-width: 640px) 100vw, 46vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <h3 className="font-sans text-[1.125rem] font-semibold text-ink-900">
                {a.city}, BC
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                {a.neighbourhoods.slice(0, 5).join(', ')}
                {a.neighbourhoods.length > 5 && ' and more'}.
              </p>
              <p className="mt-3 text-[0.8125rem] text-ink-500">{a.travelNote}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700">
                Cleaning in {a.city}
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
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
