import type { Metadata } from 'next';
import Section from '@/components/Section';
import ServiceGrid from '@/components/ServiceGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteSection from '@/components/QuoteSection';
import ProcessSteps from '@/components/ProcessSteps';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';
import { services } from '@/lib/services';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Cleaning & Organization Services | White Rock & South Surrey',
  description: `House cleaning, deep cleaning, move-out cleaning, home organization, post-renovation and rental turnovers in White Rock and South Surrey. ${site.rate.rangePerHour}.`,
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Cleaning and organization services',
            itemListElement: services.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: `${site.url}/services/${s.slug}`,
            })),
          },
        ]}
      />

      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <Section
        as="h1"
        eyebrow={`${areaList}, BC`}
        title="Cleaning and organization services"
        lead={`Everything on this page is run by ${site.founder.name}, billed at ${site.rate.rangePerHour}, with the hours agreed before the work starts. Pick the one that sounds like your situation — or describe it and she will tell you which it is.`}
      >
        <ServiceGrid headingAs="h2" />
      </Section>

      <Section
        tone="white"
        eyebrow="Not sure which one"
        title="Most people start with a deep clean"
        lead="A first deep clean catches the house up, then a recurring schedule keeps it there. After the first couple of visits the recurring cleans usually need fewer hours, because there is less to catch up on."
      >
        <ProcessSteps />
      </Section>

      <QuoteSection heading="Tell her what the house needs" />

      <CtaBand />
    </>
  );
}
