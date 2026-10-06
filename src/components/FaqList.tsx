/**
 * Native details/summary accordion — no JavaScript, so the answers are in the
 * HTML on first paint. That matters: Google will not credit FAQ content it has
 * to run a script to find.
 */
export default function FaqList({
  items,
  /** Open the first item by default on short lists. */
  openFirst = false,
  /** Pass 'h2' when this sits directly under the page h1, to avoid a skip. */
  headingAs: Heading = 'h3',
}: {
  items: { q: string; a: string }[];
  openFirst?: boolean;
  headingAs?: 'h2' | 'h3';
}) {
  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white">
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <Heading className="font-sans text-[1.0rem] font-semibold text-ink-900">
              {item.q}
            </Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition group-open:rotate-45 group-open:border-sage-300 group-open:text-sage-700"
            >
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M10 4v12M4 10h12" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
