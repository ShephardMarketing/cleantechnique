import { site, telHref, mailHref } from '@/lib/site';
import QuoteForm from './QuoteForm';
import { areaList } from '@/lib/areas';

/**
 * The conversion block. Lives at #quote so every CTA on the site, including the
 * sticky mobile bar, can scroll straight to it.
 */
export default function QuoteSection({
  heading = 'Get an hour range for your home',
  lead,
  defaultService,
  defaultArea,
}: {
  heading?: string;
  lead?: string;
  defaultService?: string;
  defaultArea?: string;
}) {
  return (
    <section id="quote" className="bg-sage-50">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:gap-14">
          <div>
            <p className="eyebrow">Free estimate</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.4rem]">
              {heading}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
              {lead ??
                `Three short steps. ${site.founder.firstName} reads every one herself and comes back with how many hours the job takes at ${site.rate.rangePerHour} — usually the same day.`}
            </p>

            <ul className="mt-7 space-y-3">
              {[
                'No deposit and no obligation to book',
                'An hour range in writing before anything starts',
                `Serving ${areaList} with no travel charge`,
                'Your details are never added to a mailing list',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-[3px] h-4 w-4 shrink-0 text-sage-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-sage-200 bg-white p-5">
              <p className="text-sm font-semibold text-ink-900">Would rather just talk?</p>
              <p className="mt-1.5 text-[0.9375rem] text-ink-600">
                <a href={telHref} className="font-semibold text-sage-700 hover:underline">
                  {site.phone}
                </a>{' '}
                · {site.hoursLabel}
              </p>
              <p className="mt-1 text-[0.875rem] text-ink-500">
                <a href={mailHref} className="hover:text-sage-700">
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          <QuoteForm defaultService={defaultService} defaultArea={defaultArea} />
        </div>
      </div>
    </section>
  );
}
