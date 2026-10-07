import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { site, mailHref } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `Privacy | ${site.name}`,
  description: `How ${site.name} handles the information you send through this website.`,
  path: '/privacy',
});

/* ─────────────────────────────────────────────────────────────────────────────
   ⚠️  PLAIN-LANGUAGE SUMMARY, NOT LEGAL ADVICE.
   This reflects how the site is actually built: one form, Google Analytics 4
   and the Meta Pixel (both added 6 Oct 2026), plus Google Tag Manager (7 Oct 2026). If you add a booking embed or an
   email platform, or remove either tag, this page has to be updated to match —
   PIPEDA and BC PIPA both expect disclosure of what is collected and why. Have
   a lawyer review it before relying on it.
   ──────────────────────────────────────────────────────────────────────────── */

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ]}
      />

      <div className="container-page py-10 lg:py-14">
        <div className="max-w-2xl">
          <h1 className="text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.4rem]">
            Privacy
          </h1>
          <p className="mt-3 text-[0.875rem] text-ink-500">
            Last updated {new Date().toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}
          </p>

          <div className="prose-local mt-8 space-y-7">
            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                What this site collects
              </h2>
              <p className="mt-2">
                One thing: what you type into the quote form. That is your name, email, phone
                number, the area you live in, and whatever you tell her about the home. It is used
                to reply to your request and to do the work if you book it.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                Where it goes
              </h2>
              <p className="mt-2">
                Straight to {site.founder.name}. It is not sold, rented or shared with anyone else,
                and you are not added to a mailing list. There is no automated marketing follow-up.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                Cookies and tracking
              </h2>
              <p className="mt-2">
                This site uses Google Analytics to count visits and see which pages people
                actually read. It sets Google&rsquo;s own cookies, records the pages you view,
                roughly where you are (city level, from your IP address) and what kind of device
                you are on. Your IP address is truncated before it is stored, and the data is
                processed by Google on servers outside Canada, including in the United States.
              </p>
              <p className="mt-2">
                It is used to decide what to write about and where to advertise. It is not used to
                identify you and it is not linked to anything you send through the quote form. To
                opt out, use your browser&rsquo;s tracking protection or install Google&rsquo;s{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="font-medium text-sage-700 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  opt-out add-on
                </a>
                .
              </p>
              <p className="mt-2">
                The site also loads <strong>Google Tag Manager</strong>, which is used to add
                Google measurement, such as whether an ad led to a quote request, without
                changing the site&rsquo;s code. Tag Manager does not collect anything on its own.
                It only loads the Google tags set up inside it, and those work as described above.
              </p>
              <p className="mt-2">
                This site also runs the <strong>Meta Pixel</strong>. It is an advertising tool: it
                tells Meta which pages you visited here, so that Facebook and Instagram ads for this
                business can be shown to people who have been on the site, and so it is possible to
                see whether an ad led to a quote request. It sets Meta&rsquo;s cookies and shares
                your activity on this site with Meta, who process it outside Canada. If you have a
                Facebook or Instagram account, Meta can connect that activity to it.
              </p>
              <p className="mt-2">
                You can turn this off. Meta&rsquo;s{' '}
                <a
                  href="https://www.facebook.com/adpreferences"
                  className="font-medium text-sage-700 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ad preferences
                </a>{' '}
                control how your activity is used for advertising, and browser tracking protection
                or an ad blocker stops the pixel loading at all. Nothing you type into the quote
                form is sent to Meta.
              </p>
              <p className="mt-2">
                Separately, the host, Vercel, keeps standard server logs that include IP addresses,
                which is how any website knows a request happened at all.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                How long it is kept
              </h2>
              <p className="mt-2">
                Quote requests are kept while there is an active conversation and for a reasonable
                period after, so that returning clients do not have to repeat themselves. Ask and it
                is deleted.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">
                Your rights
              </h2>
              <p className="mt-2">
                Under Canada&rsquo;s PIPEDA and British Columbia&rsquo;s PIPA you can ask what is
                held about you, ask for it to be corrected, or ask for it to be deleted. Email{' '}
                <a href={mailHref} className="font-medium text-sage-700 hover:underline">
                  {site.email}
                </a>{' '}
                and it will be handled.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[1.0625rem] font-semibold text-ink-900">Contact</h2>
              <p className="mt-2">
                {site.legalName}, {site.baseCity}, {site.baseRegion}. {site.phone} ·{' '}
                <a href={mailHref} className="font-medium text-sage-700 hover:underline">
                  {site.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
