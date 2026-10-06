import Link from 'next/link';
import Logo from './Logo';
import { site, telHref, mailHref } from '@/lib/site';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink-100 bg-white">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="prose-local mt-4 max-w-xs text-[0.95rem]">{site.shortDescription}</p>
            <dl className="mt-5 space-y-2 text-sm">
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={telHref} className="font-semibold text-ink-900 hover:text-sage-700">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={mailHref} className="text-ink-600 hover:text-sage-700">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Hours</dt>
                <dd className="text-ink-500">{site.hoursLabel}</dd>
              </div>
            </dl>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-sans text-sm font-semibold text-ink-900">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-ink-600 hover:text-sage-700">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas + the neighbourhood link mesh, which is what picks up
              "cleaner in Ocean Park"-style long-tail searches. */}
          <nav aria-labelledby="footer-areas">
            <h2 id="footer-areas" className="font-sans text-sm font-semibold text-ink-900">
              Where she works
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.slug}`} className="font-medium text-ink-800 hover:text-sage-700">
                    {a.city}, BC
                  </Link>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">
                    {a.neighbourhoods.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="font-sans text-sm font-semibold text-ink-900">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-ink-600 hover:text-sage-700">
                  About {site.founder.firstName}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-ink-600 hover:text-sage-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/before-and-after" className="text-ink-600 hover:text-sage-700">
                  Before &amp; after
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ink-600 hover:text-sage-700">
                  Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-600 hover:text-sage-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink-600 hover:text-sage-700">
                  Privacy
                </Link>
              </li>
            </ul>

            {(site.social.instagram || site.social.facebook) && (
              <div className="mt-6 flex gap-2">
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on Instagram`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition hover:border-sage-300 hover:text-sage-700"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="3.75" />
                      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                )}
                {site.social.facebook && (
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on Facebook`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition hover:border-sage-300 hover:text-sage-700"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                      <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.84.23-1.41 1.43-1.41h1.47V5.28A19.5 19.5 0 0 0 14.6 5.1c-2.13 0-3.6 1.3-3.6 3.69v2.31H8.6V14H11v7h2.5Z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-100 pt-7 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.baseCity}, {site.baseRegion}.
          </p>
          <p>
            Owned and operated by {site.founder.name} · {site.rate.rangePerHour}
          </p>
        </div>
      </div>
    </footer>
  );
}
