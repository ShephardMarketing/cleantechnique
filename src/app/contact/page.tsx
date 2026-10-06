import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteSection from '@/components/QuoteSection';
import Section from '@/components/Section';
import JsonLd from '@/components/JsonLd';
import { site, telHref, mailHref } from '@/lib/site';
import { areas, areaList } from '@/lib/areas';
import { breadcrumbSchema } from '@/lib/schema';
import { absoluteUrl, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `Contact ${site.name} | White Rock, BC`,
  description: `Call ${site.phone} or send a quote request. ${site.name} serves ${areaList}, BC. ${site.hoursLabel}.`,
  path: '/contact',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: absoluteUrl('/contact'),
            name: `Contact ${site.name}`,
            mainEntity: { '@id': absoluteUrl('/#business') },
          },
        ]}
      />

      <Breadcrumbs trail={trail} />

      <div className="container-page pb-4 pt-8 lg:pt-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            Get hold of {site.founder.firstName}
          </h1>
          <p className="prose-local mt-5">
            Calls go to her, not a call centre. If she is mid-clean she will not pick up, but she
            returns messages the same day.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Phone
            </h2>
            <a
              href={telHref}
              className="mt-2 block font-display text-[1.4rem] font-semibold text-ink-900 hover:text-sage-700"
            >
              {site.phone}
            </a>
            <p className="mt-2 text-[0.875rem] text-ink-500">Fastest for anything urgent.</p>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Email
            </h2>
            <a
              href={mailHref}
              className="mt-2 block break-words text-[1.0625rem] font-semibold text-ink-900 hover:text-sage-700"
            >
              {site.email}
            </a>
            <p className="mt-2 text-[0.875rem] text-ink-500">
              Good for photos of the space.
            </p>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Hours
            </h2>
            {/* Read from site.ts so this card cannot drift from the footer. */}
            {site.hours.map((h) => (
              <p
                key={h.days.join()}
                className="text-[1.0625rem] font-semibold text-ink-900 first:mt-2"
              >
                {h.days.length > 1
                  ? `${h.days[0].slice(0, 3)}–${h.days[h.days.length - 1].slice(0, 3)}`
                  : h.days[0].slice(0, 3)}{' '}
                {h.opens}–{h.closes}
              </p>
            ))}
            <p className="mt-2 text-[0.875rem] text-ink-500">Closed Sundays.</p>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-sage-600">
              Service area
            </h2>
            <ul className="mt-2 space-y-1.5">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="text-[1.0625rem] font-semibold text-ink-900 hover:text-sage-700"
                  >
                    {a.city}, BC
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.875rem] text-ink-500">No travel charge in either.</p>
          </div>
        </div>
      </Section>

      <QuoteSection heading="Or send the details here" />
    </>
  );
}
