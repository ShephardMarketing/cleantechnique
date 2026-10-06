import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';

/**
 * Stephanie's logo, with the white ground keyed out so the cream page colour
 * shows through the circle instead of a white square sitting on top of it.
 * Source file: public/images/logo.png.
 */
export default function Logo({
  className = 'h-11 w-11 lg:h-14 lg:w-14',
  asLink = true,
  showWordmark = true,
}: {
  className?: string;
  asLink?: boolean;
  /** The mark already contains the name; this adds it as selectable text too. */
  showWordmark?: boolean;
}) {
  const mark = (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/images/logo.png"
        alt=""
        width={884}
        height={877}
        priority
        className={`${className} shrink-0 object-contain`}
      />
      {showWordmark && (
        <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-ink-900 lg:hidden xl:inline whitespace-nowrap">
          The Clean Technique
        </span>
      )}
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
      {mark}
    </Link>
  );
}
