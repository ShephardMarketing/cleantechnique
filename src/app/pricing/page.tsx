import Link from 'next/link';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqList from '@/components/FaqList';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { services } from '@/lib/services';
import { pickFaqs } from '@/lib/content';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Cleaning Prices | White Rock & South Surrey, BC',
  description: `What house cleaning costs in White Rock and South Surrey: ${site.rate.rangePerHour}, quoted as an hour range before the work starts. No surprise invoices.`,
  path: '/pricing',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
];

const pricingFaqs = pickFaqs(
  'how much does',
  'why hourly',
  'how do i pay',
  'cancellation policy',
  'what is not included',
);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(pricingFaqs)]} />

      <Breadcrumbs trail={trail} />

      <div className="container-page pb-6 pt-8 lg:pt-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            {site.rate.regular} to ${site.rate.specialty} an hour, and you get the hours before you commit
          </h1>
          <div className="prose-local mt-5">
            <p>
              Most cleaning companies quote a flat rate per house. It sounds simpler until you
              realise it only works if every house is the same, and the way companies protect a
              flat quote they got wrong is by rushing the last two rooms.
            </p>
            <p>
              The Clean Technique bills by the hour and tells you the hour range up front. If the
              job takes less time than estimated, you pay for less time.
            </p>
          </div>
        </div>
      </div>

      {/* ───────────── Rate cards ───────────── */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-card">
            <p className="eyebrow">Recurring clean</p>
            <p className="mt-3 font-display text-[2.4rem] font-semibold leading-none text-ink-900">
              ${site.rate.regular}
              <span className="font-sans text-base font-normal text-ink-500">/hour</span>
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              Weekly, biweekly or monthly, on an established checklist. Floors, countertops, the
              stovetop, the full bathroom detail and vacuuming.
            </p>
          </div>

          <div className="rounded-4xl border-2 border-sage-300 bg-sage-50 p-7 shadow-card">
            <p className="eyebrow">Deep clean</p>
            <p className="mt-3 font-display text-[2.4rem] font-semibold leading-none text-ink-900">
              ${site.rate.deep}
              <span className="font-sans text-base font-normal text-ink-500">/hour</span>
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              Everything in a recurring clean, plus baseboards, the oven cleaned out, dusting
              throughout and spot-cleaning the walls. Usually the first visit for a new client.
            </p>
          </div>

          <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-card">
            <p className="eyebrow">Specialty work</p>
            <p className="mt-3 font-display text-[2.4rem] font-semibold leading-none text-ink-900">
              ${site.rate.specialty}
              <span className="font-sans text-base font-normal text-ink-500">/hour</span>
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              Move-ins and move-outs, post-renovation, home organization, Airbnb turnovers and
              standing monthly help. Slower work, harder on supplies, and often on a deadline.
            </p>
          </div>

          <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-card">
            <p className="eyebrow">What is never charged</p>
            <ul className="mt-4 space-y-2.5">
              {[
                `Travel inside ${areaList}`,
                'Supplies, products and equipment',
                'The estimate itself',
                'A deposit to hold a booking',
                'A cancellation with 24 hours notice',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ───────────── Flat-fee extras ───────────── */}
      <Section
        tone="white"
        eyebrow="Extras"
        title="Things you can add to any visit"
        lead="Flat fees, charged on top of the hours rather than eating into them. You know what each one costs before you add it, and you can add or drop any of them visit to visit."
      >
        <div className="overflow-hidden rounded-3xl border border-ink-100">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Flat-fee extras and what each one covers</caption>
            <thead>
              <tr className="bg-sand-100">
                <th scope="col" className="px-5 py-3.5 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-600">
                  Extra
                </th>
                <th scope="col" className="px-5 py-3.5 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-600">
                  Price
                </th>
                <th scope="col" className="px-5 py-3.5 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-600">
                  What it covers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 bg-white">
              {site.addOns.map((a) => (
                <tr key={a.name}>
                  <th scope="row" className="px-5 py-4 align-top font-sans text-[0.9375rem] font-semibold text-ink-900">
                    {a.name}
                  </th>
                  <td className="px-5 py-4 align-top font-sans text-[0.9375rem] font-semibold text-ink-900">
                    ${a.price}
                  </td>
                  <td className="px-5 py-4 align-top text-[0.9375rem] leading-relaxed text-ink-600">
                    {a.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">
          Standard cleaning products are used by default. Organic products are available on request
          at no extra cost &mdash; say so when you book, or leave your own out and those get used
          instead.
        </p>
      </Section>

      {/* ───────────── Typical hours by service ───────────── */}
      <Section
        tone="white"
        eyebrow="Rough hours"
        title="How long each job usually takes"
        lead="These are honest averages for a three-bedroom Peninsula home, not quotes. Your number comes from a walkthrough or your photos."
      >
        <div className="overflow-hidden rounded-3xl border border-ink-100">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Typical visit length and pricing notes for each service
            </caption>
            <thead>
              <tr className="bg-sand-100">
                <th scope="col" className="px-5 py-3.5 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-600">
                  Service
                </th>
                <th scope="col" className="px-5 py-3.5 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-600">
                  Typical visit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 bg-white">
              {services.map((s) => (
                <tr key={s.slug}>
                  <th scope="row" className="px-5 py-4 align-top font-sans text-[0.9375rem] font-semibold text-ink-900">
                    <Link href={`/services/${s.slug}`} className="hover:text-sage-700">
                      {s.name}
                    </Link>
                  </th>
                  <td className="px-5 py-4 align-top text-[0.9375rem] leading-relaxed text-ink-600">
                    {s.typicalVisit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">
          Larger homes in Morgan Creek or Elgin Chantrell run longer than these figures. Condos and
          townhouses run shorter. Either way the estimate is specific to your house, and it is free.
        </p>
      </Section>

      {/* ───────────── What is not included ───────────── */}
      <Section
        eyebrow="Out of scope"
        title="Work she will send elsewhere"
        lead="Saying yes to these would mean doing them badly."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Mould remediation',
            'Carpet and upholstery steam cleaning',
            'Exterior windows above ground level',
            'Biohazard or crime-scene cleanup',
            'Pest control',
            'Hoarding situations needing a specialist team',
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-ink-100 bg-white px-5 py-4 text-[0.9375rem] text-ink-700"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
          If your job needs one of these, ask anyway. She works on the Peninsula every week and
          knows who actually turns up.
        </p>
      </Section>

      <Section tone="white" eyebrow="Questions" title="About cost and billing">
        <FaqList items={pricingFaqs} openFirst />
      </Section>

      <QuoteSection heading="Get your number" />

      <CtaBand />
    </>
  );
}
