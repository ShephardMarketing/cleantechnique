import { testimonials } from '@/lib/content';
import Section from './Section';
import { site } from '@/lib/site';

/**
 * Hidden until real testimonials are added to lib/content.ts.
 * Nothing on this site invents a review.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      tone="white"
      eyebrow="What clients say"
      title={`In their words, not ${site.founder.firstName}’s`}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={`${t.name}-${t.quote.slice(0, 16)}`} className="card flex flex-col">
            {t.rating && (
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${i < t.rating! ? 'text-sage-500' : 'text-ink-200'}`}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2l2.4 5.1 5.6.7-4.1 3.9 1 5.6L10 14.6 5.1 17.3l1-5.6L2 7.8l5.6-.7L10 2Z" />
                  </svg>
                ))}
              </div>
            )}
            <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
              “{t.quote}”
            </blockquote>
            <footer className="mt-4 border-t border-ink-100 pt-3 text-[0.8125rem]">
              <span className="font-semibold text-ink-900">{t.name}</span>
              <span className="text-ink-500"> · {t.location}</span>
              {t.service && <span className="block text-ink-400">{t.service}</span>}
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
