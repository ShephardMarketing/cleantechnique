import { site } from './site';
import { areas, type Area } from './areas';
import { services, type Service } from './services';
import { testimonials } from './content';
import { absoluteUrl } from './seo';

/**
 * JSON-LD builders. Everything here is driven by the content files, so schema
 * can never drift from what is actually on the page — which is the usual way
 * local sites end up with structured-data warnings in Search Console.
 */

const BUSINESS_ID = absoluteUrl('/#business');
const WEBSITE_ID = absoluteUrl('/#website');

const openingHours = site.hours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

/** Only emit a rating when there are real reviews behind it. */
const ratedTestimonials = testimonials.filter((t) => typeof t.rating === 'number');

const aggregateRating =
  ratedTestimonials.length > 0
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (
            ratedTestimonials.reduce((sum, t) => sum + (t.rating ?? 0), 0) / ratedTestimonials.length
          ).toFixed(1),
          reviewCount: ratedTestimonials.length,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {};

const reviewNodes =
  testimonials.length > 0
    ? {
        review: testimonials.map((t) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: t.name },
          reviewBody: t.quote,
          ...(t.rating
            ? {
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: t.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
        })),
      }
    : {};

/**
 * The main LocalBusiness node. HouseCleaningService is the most specific
 * schema.org type that fits, and it inherits everything LocalBusiness has.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HouseCleaningService', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.shortDescription,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: site.priceRange,
    image: absoluteUrl('/images/og-default.jpg'),
    logo: absoluteUrl('/images/logo.png'),
    currenciesAccepted: 'CAD',
    paymentAccepted: 'E-transfer, Cash',
    founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.role },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.baseCity,
      addressRegion: site.baseRegionCode,
      addressCountry: site.baseCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: areas.map((a) => ({
      '@type': 'City',
      name: a.city,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'British Columbia' },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      geoRadius: site.serviceRadiusKm * 1000,
    },
    openingHoursSpecification: openingHours,
    sameAs: Object.values(site.social).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning and organization services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: absoluteUrl(`/services/${s.slug}`),
        },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'CAD',
          minPrice: site.rate.min,
          maxPrice: site.rate.max,
          unitCode: 'HUR',
        },
      })),
    },
    ...aggregateRating,
    ...reviewNodes,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-CA',
  };
}

/** Service page schema, tied to the business node and its service area. */
export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: { '@id': BUSINESS_ID },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.city })),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CAD',
        minPrice: site.rate.min,
        maxPrice: site.rate.max,
        unitCode: 'HUR',
      },
      availability: 'https://schema.org/InStock',
    },
  };
}

/** Area page schema — a city-scoped version of the business. */
export function areaServiceSchema(area: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaningService',
    name: `${site.name} — ${area.city}`,
    description: area.metaDescription,
    url: absoluteUrl(`/${area.slug}`),
    parentOrganization: { '@id': BUSINESS_ID },
    telephone: site.phoneHref,
    priceRange: site.priceRange,
    areaServed: [
      { '@type': 'City', name: area.city, addressRegion: site.baseRegionCode },
      ...area.neighbourhoods.map((n) => ({ '@type': 'Place', name: `${n}, ${area.city}` })),
    ],
    geo: { '@type': 'GeoCoordinates', latitude: area.geo.lat, longitude: area.geo.lng },
    openingHoursSpecification: openingHours,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: { '@id': BUSINESS_ID },
    url: absoluteUrl('/about'),
    image: absoluteUrl('/images/stephanie-wideski.jpg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.baseCity,
      addressRegion: site.baseRegionCode,
      addressCountry: site.baseCountry,
    },
  };
}
