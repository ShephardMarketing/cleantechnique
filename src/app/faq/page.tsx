import type { Metadata } from 'next';
import Section from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqList from '@/components/FaqList';
import QuoteSection from '@/components/QuoteSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { faqs } from '@/lib/content';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Cleaning Questions | White Rock & South Surrey',
  description: `Cost, scheduling, access, pets and what is not included. Straight answers about house cleaning in ${areaList}, BC.`,
  path: '/faq',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(faqs)]} />

      <Breadcrumbs trail={trail} />

      <div className="container-page pb-4 pt-8 lg:pt-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Questions</p>
          <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            Everything people ask before booking
          </h1>
          <p className="prose-local mt-5">
            If the answer you need is not here, call {site.phone} and ask{' '}
            {site.founder.firstName} directly. She would rather answer a question now than have you
            find out the awkward way later.
          </p>
        </div>
      </div>

      <Section>
        <FaqList items={faqs} openFirst headingAs="h2" />
      </Section>

      <QuoteSection />

      <CtaBand />
    </>
  );
}
