import Link from 'next/link';
import { site, telHref } from '@/lib/site';
import { areas } from '@/lib/areas';
import { services } from '@/lib/services';

export const metadata = {
  title: 'Page not found',
  // Next emits its own noindex for not-found; a second robots tag here only
  // produced two conflicting directives on the same page.
};

export default function NotFound() {
  return (
    <div className="container-page py-20 lg:py-28">
      <div className="max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.4rem]">
          That page is not here
        </h1>
        <p className="prose-local mt-4">
          Either the link is old or something got mistyped. Here is where most people were heading.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Areas
            </h2>
            <ul className="mt-3 space-y-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.slug}`} className="text-[0.9375rem] text-ink-700 hover:text-sage-700">
                    Cleaning in {a.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Services
            </h2>
            <ul className="mt-3 space-y-2">
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[0.9375rem] text-ink-700 hover:text-sage-700"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to the home page
          </Link>
          <a href={telHref} className="btn-secondary">
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
