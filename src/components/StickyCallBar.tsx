import Link from 'next/link';
import { site, telHref } from '@/lib/site';

/**
 * Mobile-only bottom bar. Most local-service traffic is on a phone with intent
 * to call, so the two actions stay reachable without scrolling back up.
 * Hidden on print and above the lg breakpoint.
 */
export default function StickyCallBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
      <div className="flex gap-2.5">
        <a href={telHref} className="btn-secondary flex-1 !px-4 !py-3 text-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path
              d="M4.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.65 1.49A15.5 15.5 0 0 1 3 6.15 1.5 1.5 0 0 1 4.5 4.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Call
        </a>
        <Link href="/#quote" className="btn-primary flex-[1.5] !px-4 !py-3 text-sm">
          Get a quote
        </Link>
      </div>
      <p className="sr-only">
        Call {site.name} at {site.phone}
      </p>
    </div>
  );
}
