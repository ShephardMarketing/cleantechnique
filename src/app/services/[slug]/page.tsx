import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceGrid from '@/components/ServiceGrid';
import FaqList from '@/components/FaqList';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import ServiceIcon from '@/components/ServiceIcon';
import { site, telHref } from '@/lib/site';
import { areas, areaList } from '@/lib/areas';
import { serviceBySlug, services } from '@/lib/services';
import { pickFaqs } from '@/lib/content';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

/** Pre-render all six at build time; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return pageMeta({
    title: `${service.name} in White Rock & South Surrey`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  // Service-specific questions first, then the two most relevant global ones.
  const pageFaqs = [...service.faqs, ...pickFaqs('how much does', 'what areas')];

  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema(trail), faqSchema(pageFaqs)]} />

      <Breadcrumbs trail={trail} />

      {/* ───────────── Hero ───────────── */}
      <div className="container-page pb-4 pt-8 lg:pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-14">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-50 text-sage-600">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
              {service.name} in White Rock &amp; South Surrey
            </h1>
            <div className="prose-local mt-5 max-w-xl">
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#quote" className="btn-primary">
                Get a quote for this
              </Link>
              <a href={telHref} className="btn-secondary">
                {site.phone}
              </a>
            </div>
          </div>

          <aside className="w-full rounded-3xl border border-ink-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
              The short version
            </h2>
            <dl className="mt-4 space-y-4 text-[0.9375rem]">
              <div>
                <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-sage-600">
                  Rate
                </dt>
                <dd className="mt-1 text-ink-700">{site.rate.rangePerHour}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-sage-600">
                  Typical visit
                </dt>
                <dd className="mt-1 text-ink-700">{service.typicalVisit}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-sage-600">
                  How it is priced
                </dt>
                <dd className="mt-1 text-ink-700">{service.priceNote}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-sage-600">
                  Where
                </dt>
                <dd className="mt-1 text-ink-700">{areaList}, BC</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>

      {/* ───────────── What it covers ───────────── */}
      <Section
        tone="white"
        eyebrow="The checklist"
        title={`What a ${service.inline} covers`}
        lead="This is the working list. Add to it, cross things off it, or hand over your own — it is your house."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {service.includes.map((group) => (
            <div key={group.group} className="rounded-3xl bg-sand-50 p-6">
              <h3 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                {group.group}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
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
          ))}
        </div>
      </Section>

      {/* ───────────── Best for + local areas ───────────── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-[1.85rem]">
              Who books a {service.inline}
            </h2>
            <ul className="mt-5 space-y-3">
              {service.bestFor.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-[0.9375rem] text-ink-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-[1.85rem]">
              Where she does it
            </h2>
            <p className="prose-local mt-4">
              {service.name} is available across both service areas, with no travel charge inside
              either one.
            </p>
            <div className="mt-5 grid gap-3">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition hover:border-sage-200 hover:shadow-card"
                >
                  <span>
                    <span className="block font-sans font-semibold text-ink-900">{a.city}, BC</span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-500">
                      {a.neighbourhoods.slice(0, 4).join(' · ')}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-1 h-4 w-4 shrink-0 text-sage-600 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-3xl bg-sand-100">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section tone="white" eyebrow="Questions" title={`About ${service.name.toLowerCase()}`}>
        <FaqList items={pageFaqs} openFirst />
      </Section>

      <QuoteSection
        heading={`Get a quote for a ${service.inline}`}
        defaultService={service.slug}
      />

      {/* ───────────── Other services ───────────── */}
      <Section
        eyebrow="Also available"
        title="Other things she can take off your hands"
      >
        <ServiceGrid exclude={service.slug} limit={3} />
      </Section>

      <CtaBand />
    </>
  );
}
