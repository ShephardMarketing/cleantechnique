import { site } from '@/lib/site';
import { areaList } from '@/lib/areas';

const items = [
  { label: 'Owned and operated', detail: `${site.founder.name} runs every job` },
  { label: site.rate.rangePerHour, detail: 'Quoted as an hour range up front' },
  { label: 'Free cancellation', detail: '24 hours notice and no charge' },
  { label: 'Local', detail: areaList },
];

/** Narrow strip of proof points directly under the hero. */
export default function TrustBar() {
  return (
    <div className="border-y border-ink-100 bg-white">
      <div className="container-page">
        <dl className="grid grid-cols-2 divide-ink-100 lg:grid-cols-4 lg:divide-x">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`px-1 py-5 lg:px-6 ${i < 2 ? 'border-b border-ink-100 lg:border-b-0' : ''} ${
                i % 2 === 1 ? 'border-l border-ink-100 lg:border-l-0' : ''
              } ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <dt className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 text-sage-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.label}
              </dt>
              <dd className="mt-1 pl-[1.375rem] text-[0.8125rem] leading-snug text-ink-500">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
