import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import { site } from '@/lib/site';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';
import { areaList } from '@/lib/areas';

/**
 * Fonts are self-hosted from src/fonts rather than pulled from Google Fonts.
 * Two reasons: no blocking third-party request on first paint, and the build
 * does not depend on fonts.googleapis.com being reachable. Both files are
 * variable-weight latin subsets, ~45KB each.
 */
const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-sans',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  preload: true,
});

const fraunces = localFont({
  src: '../fonts/fraunces-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  preload: true,
});

export const metadata: Metadata = {
  // metadataBase makes every relative canonical and OG URL absolute.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | House Cleaning in ${site.baseCity} & South Surrey, BC`,
    // No brand suffix: it ate 22 characters of every title and pushed most of
    // them past the ~60 Google actually renders. Pages that have room for the
    // brand include it themselves.
    template: '%s',
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  publisher: site.legalName,
  keywords: [
    'house cleaning White Rock',
    'cleaning services South Surrey',
    'home organization White Rock BC',
    'deep cleaning South Surrey',
    'move out cleaning White Rock',
    'cleaner Ocean Park BC',
    'Crescent Beach house cleaning',
    'Morgan Creek cleaning service',
  ],
  category: 'Home services',
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: site.name,
    url: site.url,
  },
  // Google Search Console ownership (Stephanie's Google account). Removing
  // this un-verifies the property.
  verification: { google: '8CT9XMt9DUKkIAKp30D7zTvA-U-byrRxug7Y1pLo81Q' },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '64x64' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '512x512' }],
  },
  other: {
    // Geo meta tags are legacy, but some local directories still parse them.
    'geo.region': 'CA-BC',
    'geo.placename': `${site.baseCity}, British Columbia`,
    'geo.position': `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: '#fdfbf7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Site-wide structured data: one business node every page can reference. */}
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Breathing room so the sticky bar never covers the footer on mobile. */}
        <div aria-hidden="true" className="h-20 lg:hidden" />
        <StickyCallBar />

        {/* Loaded after hydration so it never delays first paint. */}
        <Analytics />

        {/* Fallback for crawlers and no-JS: the two things that matter most. */}
        <noscript>
          <div className="container-page py-6 text-sm">
            Call {site.phone} or email {site.email}. Serving {areaList}, BC.
          </div>
        </noscript>
      </body>
    </html>
  );
}
