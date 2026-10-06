import type { ReactNode } from 'react';

/** Consistent vertical rhythm and an optional heading block for every section. */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  tone = 'default',
  align = 'left',
  as: Heading = 'h2',
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: 'default' | 'white' | 'sage' | 'ink';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const tones = {
    default: '',
    white: 'bg-white',
    sage: 'bg-sage-50',
    ink: 'bg-ink-900 text-sand-100',
  } as const;

  const hasHeading = Boolean(eyebrow || title || lead);

  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="container-page py-16 lg:py-20">
        {hasHeading && (
          <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <Heading
                className={`${eyebrow ? 'mt-3' : ''} text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.4rem] ${
                  tone === 'ink' ? '!text-sand-50' : ''
                }`}
              >
                {title}
              </Heading>
            )}
            {lead && (
              <p
                className={`mt-4 text-[1.0625rem] leading-relaxed ${
                  tone === 'ink' ? 'text-sand-200/80' : 'text-ink-600'
                }`}
              >
                {lead}
              </p>
            )}
          </div>
        )}
        {children && <div className={hasHeading ? 'mt-10 lg:mt-12' : ''}>{children}</div>}
      </div>
    </section>
  );
}
