import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site, telHref } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { differentiators } from '@/lib/content';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `About ${site.founder.name} | ${site.name}`,
  description: `Meet ${site.founder.name}, the owner behind ${site.name} in White Rock, BC. Serving ${areaList} at ${site.rate.rangePerHour}.`,
  path: '/about',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), breadcrumbSchema(trail)]} />

      <Breadcrumbs trail={trail} />

      <div className="container-page pb-8 pt-8 lg:pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr,0.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">{site.baseCity}, BC</p>
            <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
              Meet {site.founder.name}
            </h1>

            {/* Her own words, supplied Oct 2026. Still worth asking her for: how
                long she has been doing this, what she did before, and the one
                thing she is fussiest about on a job. Those three would make the
                page more specific again. */}
            <div className="prose-local mt-5 max-w-xl">
              <p>
                Stephanie is a single mother of four. When she started thinking about running
                something of her own, the work that made sense was what she was already doing every
                day &mdash; looking after a home, properly. She figured she could do that for other
                people&rsquo;s houses the way she does it for her own.
              </p>
              <p>
                That is still the part she likes: a home someone is proud of and actually wants to be
                in, rather than one that has merely been cleaned. Working for herself is also what
                keeps the hours bending around her kids, her dogs and the rest of her family, which
                was the other half of the reason.
              </p>
              <p>
                She owns and operates The Clean Technique. She quotes the work, she is on the job,
                and she answers for how your home is left. No dispatcher, and nobody telling you your
                regular person has moved on.
              </p>
              <p>
                She works out of White Rock and across South Surrey, and the work is broader than
                cleaning. Organizing, laundry, the dishes, the standing jobs that never make it onto
                anyone&rsquo;s list. The parts go together more often than people expect &mdash; a pantry cannot
                be cleaned properly until someone decides what is actually staying in it, and a closet
                that is wiped but still unusable has not really been dealt with.
              </p>
              <p>
                Some clients book a clean. Others hand over a standing monthly arrangement and stop
                thinking about the inside of the house altogether &mdash; closer to a concierge than a
                cleaner. Both are fine, and the second one is usually where people end up.
              </p>
              <p>
                The way she prices reflects that. ${site.rate.regular} an hour for a recurring
                clean, ${site.rate.deep} for a deep clean, ${site.rate.specialty} for move-outs,
                organizing and the rest &mdash; with an hour range agreed before the work starts, and
                if the job comes in under the estimate you pay for the hours it took. Extras like
                laundry or the windows are flat fees you can see before you add them. It is a slower
                way to build a cleaning business and a much easier one to be honest in.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#quote" className="btn-primary">
                Get a quote from Stephanie
              </Link>
              <a href={telHref} className="btn-secondary">
                {site.phone}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl border border-ink-100 bg-sand-100 shadow-lift">
            {/* ⚠️ Replace with a real headshot at /public/images/stephanie-wideski.jpg */}
            <Image
              src="/images/stephanie-wideski.jpg"
              alt={`${site.founder.name}, owner of ${site.name} in White Rock, BC`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* A candid Stephanie supplied, Oct 2026. It sits here as evidence for the
          line about her family above, not as decoration. Square on purpose: the
          source is 1:1, so nothing is cropped. The headshot frame in the hero is
          still a placeholder and still needs a real face-forward photo. */}
      {/* ⚠️ Stephanie + dog photo goes here — image pending upload. */}

      <Section
        tone="white"
        eyebrow="How she works"
        title="The parts that do not change"
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

      <Section
        eyebrow="Practical things"
        title="The answers people want before they call"
      >
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Cancellations', d: 'Twenty-four hours notice and there is no charge. Less than that and the booked time is hard to fill, so it gets billed.' },
            { t: 'Supplies', d: 'Everything comes with her, vacuum included. If you would rather she used your products, leave them out.' },
            { t: 'Access', d: 'Key, lockbox, garage code or you at home — whichever you prefer, agreed in writing first.' },
            { t: 'Payment', d: 'E-transfer after the visit, or cash. Recurring clients get invoiced on a schedule that suits them.' },
            { t: 'Pets', d: 'Not a problem. Tell her what she should know about them beforehand.' },
            { t: 'If something is off', d: 'Say so. She comes back and fixes it rather than arguing about the invoice.' },
          ].map((item) => (
            <div key={item.t} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
              <dt className="font-sans text-[1rem] font-semibold text-ink-900">{item.t}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{item.d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <QuoteSection heading="Start with a quote" />

      <CtaBand />
    </>
  );
}
