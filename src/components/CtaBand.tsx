import Link from 'next/link';
import { site, telHref } from '@/lib/site';

export default function CtaBand({
  heading = 'Want a number before you commit?',
  body,
  cta = { href: '/#quote', label: 'Get a quote' },
}: {
  heading?: string;
  body?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="no-print bg-ink-900">
      <div className="container-page py-14 lg:py-16">
        <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] font-semibold leading-tight !text-sand-50 sm:text-[2.1rem]">
              {heading}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-sand-200/75">
              {body ??
                `Tell ${site.founder.firstName} about the house and she will send back an hour range at ${site.rate.rangePerHour}. No deposit, no sales call, no obligation to book.`}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <Link href={cta.href} className="btn-primary !bg-sage-500 hover:!bg-sage-400">
              {cta.label}
            </Link>
            <a
              href={telHref}
              className="btn border border-sand-200/25 text-sand-100 transition hover:bg-white/5 focus-visible:ring-sage-400"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
