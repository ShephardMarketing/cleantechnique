import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { areas } from '@/lib/areas';
import { services } from '@/lib/services';
import { absoluteUrl } from '@/lib/seo';

/**
 * Priorities are set deliberately: the two area pages are the commercial
 * landing pages and sit level with the home page, service pages just below,
 * and the supporting pages lower. Privacy is excluded — there is no reason to
 * spend crawl budget on it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...areas.map((a) => ({
      url: absoluteUrl(`/${a.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    })),
    { url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: absoluteUrl('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: absoluteUrl('/before-and-after'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  // Guard against a forgotten domain swap producing a sitemap full of
  // localhost URLs, which Search Console rejects outright.
  if (!site.url.startsWith('https://')) {
    console.warn('[sitemap] site.url is not an https URL. Fix it in src/lib/site.ts.');
  }

  return core;
}
