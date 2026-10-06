import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { beforeAfters } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/schema';
import { absoluteUrl, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Before & After Cleaning Photos | White Rock & South Surrey',
  description: `Before and after photos from real house cleaning and home organization jobs in White Rock and South Surrey. Drag to compare. ${site.rate.rangePerHour}.`,
  path: '/before-and-after',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Before & after', path: '/before-and-after' },
];

export default function BeforeAfterPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          // ImageGallery with every pair listed gives the photos their own shot
          // at ranking in Google Images, which is where a lot of "before and
          // after cleaning" searches actually land.
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `Before and after cleaning — ${areaList}`,
            url: absoluteUrl('/before-and-after'),
            associatedMedia: beforeAfters.flatMap((b) => [
              {
                '@type': 'ImageObject',
                contentUrl: absoluteUrl(b.before),
                caption: b.beforeAlt,
              },
              {
                '@type': 'ImageObject',
                contentUrl: absoluteUrl(b.after),
                caption: b.afterAlt,
              },
            ]),
          },
        ]}
      />

      <Breadcrumbs trail={trail} />

      <div className="container-page pb-4 pt-8 lg:pt-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Before &amp; after</p>
          <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            Real jobs in real Peninsula homes
          </h1>
          <div className="prose-local mt-5">
            <p>
              Every pair below is a real job, start to finish. Drag the handle
              across to compare.
            </p>
            <p>
              Nothing here is staged and nothing is a stock photo. If a before shot looks bad, that
              is because the room looked like that when she walked in — which is the whole point.
            </p>
          </div>
        </div>
      </div>

      <Section>
        {beforeAfters.length > 0 ? (
          <BeforeAfterGallery headingAs="h2" />
        ) : (
          /* Visible only until the first real pairs are added. */
          <p className="rounded-3xl border border-dashed border-ink-200 bg-white p-8 text-center text-ink-500">
            Photos are being added. In the meantime, call {site.phone} and
            ask — {site.founder.firstName} can send recent examples directly.
          </p>
        )}
      </Section>

      <Section
        tone="white"
        eyebrow="About these photos"
        title="Why the before shots are not flattering"
        lead="A gallery of already-tidy rooms tells you nothing. These are the jobs where the difference was worth photographing — baked-on hood grease, stained grout, hard water on matte black fixtures, and tile that had gone dull."
      />

      <QuoteSection heading="Want your own before and after?" />

      <CtaBand />
    </>
  );
}
