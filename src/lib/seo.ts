import type { Metadata } from 'next';
import { site } from './site';

export const absoluteUrl = (path = '/') =>
  `${site.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

type PageMetaArgs = {
  title: string;
  description: string;
  /** Path only, e.g. "/services/deep-cleaning". Drives the canonical tag. */
  path: string;
  /** Defaults to the shared OG image. */
  image?: string;
  /** Set true on thank-you pages and anything that should stay out of the index. */
  noindex?: boolean;
};

/**
 * Builds consistent metadata for every page: canonical URL, Open Graph and
 * Twitter cards. Canonicals matter here because paid traffic will arrive with
 * gclid and utm parameters appended, and without a canonical each variant can
 * be treated as a separate URL.
 */
export function pageMeta({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  noindex = false,
}: PageMetaArgs): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: 'en_CA',
      type: 'website',
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}
