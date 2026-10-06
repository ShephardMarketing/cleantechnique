import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Section from '@/components/Section';
import ServiceGrid from '@/components/ServiceGrid';
import ProcessSteps from '@/components/ProcessSteps';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import AreaCards from '@/components/AreaCards';
import FaqList from '@/components/FaqList';
import Testimonials from '@/components/Testimonials';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { differentiators, faqs, beforeAfters } from '@/lib/content';
import { faqSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `House Cleaning White Rock & South Surrey | ${site.name}`,
  description: `Owned and operated house cleaning, organizing and in-home help across White Rock and South Surrey. ${site.rate.rangePerHour}. Call ${site.phone}.`,
  path: '/',
});

const homeFaqs = faqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <Hero
        eyebrow={`${areaList}, BC`}
        heading="Cleaning, organizing and in-home help in White Rock and South Surrey"
        sub={`${site.founder.name} owns and operates The Clean Technique. She quotes the work, runs it and answers for the result — at ${site.rate.rangePerHour}, with the hours agreed before anything starts.`}
        image="/images/before-after/vanity-sink-after.jpg"
        imageAlt="A bathroom vanity left clean and spot-free after a visit from The Clean Technique"
        bullets={[
          'Owned and operated, start to finish',
          'Cleaning, organizing, laundry and dishes',
          'An hour range quoted up front',
          'No travel charge on the Peninsula',
        ]}
      />

      <TrustBar />

      {/* ───────────── Services ───────────── */}
      <Section
        id="services"
        eyebrow="What she does"
        title="What she takes off your plate"
        lead="Regular upkeep, a one-off reset, a weekend spent making the garage usable again, or a standing monthly arrangement for whatever the house needs that month. All billed by the hour, so you only pay for the work the house actually needs."
      >
        <ServiceGrid />
      </Section>

      {/* ───────────── Why her ───────────── */}
      <Section
        tone="white"
        eyebrow="Why this and not a franchise"
        title="Run by the owner, not by a dispatcher"
        lead="Franchises send whoever is on the schedule that week. That is why the first clean is great and the fourth one is not."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-3xl bg-sand-50 p-6">
              <h3 className="font-sans text-[1.0625rem] font-semibold text-ink-900">{d.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Before and after ───────────── */}
      {beforeAfters.length > 0 && (
        <Section
          eyebrow="Before and after"
          title="Drag the handle and see for yourself"
          lead="Real jobs, photographed before and after. Baked-on hood grease, stained grout and hard water on matte black fixtures — the things a quick tidy never touches."
        >
          <BeforeAfterGallery limit={2} />
          <div className="mt-9">
            <Link href="/before-and-after" className="btn-secondary">
              See the full gallery
            </Link>
          </div>
        </Section>
      )}

      {/* ───────────── Process ───────────── */}
      <Section
        tone="white"
        eyebrow="How it works"
        title="Four steps, no sales call"
        lead="Nobody is going to sit in your kitchen with a clipboard talking about packages."
      >
        <ProcessSteps />
      </Section>

      {/* ───────────── Pricing snapshot ───────────── */}
      <Section>
        <div className="grid items-center gap-10 rounded-4xl border border-ink-100 bg-white p-7 shadow-card lg:grid-cols-[1fr,0.85fr] lg:p-10">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.3rem]">
              {site.rate.range} an hour, and you know the hours first
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
              Maintenance cleaning sits at the lower end. Deep cleans, post-renovation work and
              organizing sessions sit at the upper end, because they are slower and harder on
              supplies. Either way the hour range is agreed before anything is booked, and if the
              job runs short you pay for the shorter job.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/pricing" className="btn-secondary">
                How the pricing works
              </Link>
              <Link href="/#quote" className="btn-ghost">
                Get your hour range
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand-100 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/before-after/kitchen-island-after.jpg"
              alt="A kitchen island left clear and wiped down at the end of a visit"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ───────────── Areas ───────────── */}
      <Section
        tone="white"
        eyebrow="Service area"
        title="Based in White Rock, working the Peninsula"
        lead="Close enough to fit you in on short notice, and close enough that the standard matters."
      >
        <AreaCards />
      </Section>

      <Testimonials />

      {/* ───────────── FAQ ───────────── */}
      <Section
        eyebrow="Questions"
        title="The things people ask first"
        lead="If yours is not here, call and ask."
      >
        <FaqList items={homeFaqs} openFirst />
        <div className="mt-8">
          <Link href="/faq" className="btn-secondary">
            All questions
          </Link>
        </div>
      </Section>

      <QuoteSection />

      <CtaBand />
    </>
  );
}
