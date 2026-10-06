import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustBar from '@/components/TrustBar';
import ProcessSteps from '@/components/ProcessSteps';
import FaqList from '@/components/FaqList';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import ServiceIcon from '@/components/ServiceIcon';
import { site, telHref } from '@/lib/site';
import { areaBySlug, areas } from '@/lib/areas';
import { services } from '@/lib/services';
import { beforeAfters, pickFaqs } from '@/lib/content';
import { areaServiceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

/**
 * Area landing pages live at the root (/house-cleaning-white-rock) because an
 * exact-match keyword URL at the top level carries more weight locally than a
 * nested /areas/ path. Static segments like /about always win over this dynamic
 * segment, and dynamicParams = false means any other slug 404s instead of
 * rendering a thin page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

type Params = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { area: slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};

  return pageMeta({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/${area.slug}`,
  });
}

export default async function AreaPage({ params }: Params) {
  const { area: slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const otherAreas = areas.filter((a) => a.slug !== area.slug);
  // Prefer pairs tagged with this city; until the photos carry a location,
  // fall back to the first few so the section is never empty.
  const tagged = beforeAfters.filter((b) => b.area === area.city);
  const localExamples = tagged.length > 0 ? tagged : beforeAfters.slice(0, 2);

  const areaFaqs = [
    {
      q: `Do you cover all of ${area.city}?`,
      a: `Yes — every neighbourhood listed on this page, and the postal codes starting ${area.postalCodes.join(', ')}. ${area.travelNote} If you are just outside, call and ask; it usually depends on what else is booked that day.`,
    },
    {
      q: `How soon can you get to a ${area.city} home?`,
      a: 'One-off cleans can often happen within the week. Recurring clients take a standing slot, and those fill up first, so the sooner you ask the better the choice of day.',
    },
    ...pickFaqs(
      'how much does',
      'who actually shows up',
      'need to be home',
      'cancellation policy',
    ),
  ];

  const geoName = `${area.city}, ${site.baseRegionCode}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: geoName, path: `/${area.slug}` },
  ];

  return (
    <>
      <JsonLd data={[areaServiceSchema(area), breadcrumbSchema(trail), faqSchema(areaFaqs)]} />

      <Breadcrumbs trail={trail} />

      {/* ───────────── Hero ───────────── */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-sage-100/50 blur-3xl"
        />
        <div className="container-page relative pb-10 pt-8 lg:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-14">
            <div>
              <p className="eyebrow">{geoName}</p>
              <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem] lg:text-[2.9rem]">
                {area.h1}
              </h1>
              <div className="prose-local mt-5 max-w-xl">
                {area.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#quote" className="btn-primary">
                  Get a {area.city} quote
                </Link>
                <a href={telHref} className="btn-secondary">
                  {site.phone}
                </a>
              </div>
              <p className="mt-4 text-[0.8125rem] text-ink-500">
                {area.travelNote} · {site.rate.rangePerHour} · {site.hoursLabel}
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-ink-100 bg-sand-100 shadow-lift">
              <Image
                src={area.image}
                alt={`A ${area.city} home left clean at the end of a visit from ${site.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <TrustBar />

      {/* ───────────── Local specifics ───────────── */}
      <Section
        eyebrow={`Cleaning in ${area.city}`}
        title={`What is actually different about ${area.city} homes`}
        lead={`Generic checklists miss the things that matter in a specific place. These are the four that come up most in ${area.city}.`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {area.localNotes.map((note) => (
            <div key={note.title} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
              <h3 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                {note.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{note.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Services here ───────────── */}
      <Section
        tone="white"
        eyebrow="Services"
        title={`What she takes care of in ${area.city}`}
        lead={`Every service is available across ${area.city} at ${site.rate.rangePerHour}.`}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl bg-sand-50 p-6 transition hover:bg-sage-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sage-600 shadow-card">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-sans text-[1rem] font-semibold text-ink-900">
                  {s.name} in {area.city}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {s.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ───────────── Neighbourhoods ───────────── */}
      <Section
        eyebrow="Neighbourhoods"
        title={`Where in ${area.city} she works`}
        lead={`Every one of these, plus the postal codes starting ${area.postalCodes.join(', ')}. ${area.travelNote}`}
      >
        <ul className="flex flex-wrap gap-2.5">
          {area.neighbourhoods.map((n) => (
            <li
              key={n}
              className="rounded-full border border-ink-100 bg-white px-4 py-2 text-[0.9375rem] text-ink-700 shadow-card"
            >
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
          Close to {area.landmarks.slice(0, 3).join(', ')} and the rest of the Semiahmoo Peninsula.
          If your street is not obviously on this list, call and ask — the answer is usually yes.
        </p>
      </Section>

      {/* ───────────── Local before and after ───────────── */}
      {localExamples.length > 0 && (
        <Section
          tone="white"
          eyebrow="Before and after"
          title="Recent work"
          lead="Drag the handle to compare."
        >
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            {localExamples.map((item) => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-9">
            <Link href="/before-and-after" className="btn-secondary">
              See every before and after
            </Link>
          </div>
        </Section>
      )}

      {/* ───────────── Process ───────────── */}
      <Section eyebrow="How it works" title={`Booking a clean in ${area.city}`}>
        <ProcessSteps />
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section
        tone="white"
        eyebrow="Questions"
        title={`${area.city} questions`}
      >
        <FaqList items={areaFaqs} openFirst />
      </Section>

      <QuoteSection
        heading={`Get an hour range for your ${area.city} home`}
        defaultArea={area.slug}
      />

      {/* ───────────── Other area ───────────── */}
      <Section
        eyebrow="Also serving"
        title="Just outside this area?"
        lead="She works both sides of the Peninsula."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {otherAreas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/${a.slug}`}
                className="group block rounded-3xl border border-ink-100 bg-white p-6 shadow-card transition hover:border-sage-200 hover:shadow-lift"
              >
                <h3 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                  House cleaning in {a.city}, BC
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {a.neighbourhoods.slice(0, 5).join(', ')} and more.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700">
                  See the {a.city} page
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
      </Section>

      <CtaBand heading={`Ready to get your ${area.city} home sorted?`} />
    </>
  );
}
