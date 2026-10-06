'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import type { BeforeAfter } from '@/lib/content';

/**
 * Drag-to-reveal before/after comparison.
 *
 * Accessibility: the handle is a real range input, so it works with a keyboard
 * and announces a value to screen readers. Both images also carry their own alt
 * text, which is what gets picked up by Google Images for "before and after
 * house cleaning White Rock"-style searches.
 */
export default function BeforeAfterSlider({
  item,
  /** Pass 'h2' when the gallery sits directly under the page h1. */
  headingAs: Heading = 'h3',
}: {
  item: BeforeAfter;
  headingAs?: 'h2' | 'h3';
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <figure className="group">
      <div
        ref={frame}
        style={{ aspectRatio: item.ratio }}
        className="relative w-full select-none overflow-hidden rounded-3xl border border-ink-100 bg-sand-100 shadow-card"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* After sits underneath and is revealed as the clip shrinks. */}
        <Image
          src={item.after}
          alt={item.afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none object-cover"
        />

        {/* Before is clipped from the right edge. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={item.before}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="pointer-events-none object-cover"
          />
        </div>

        {/* The before image needs real alt text somewhere crawlable, but it is
            already shown above, so this copy is kept out of the visual flow. */}
        <span className="sr-only">{item.beforeAlt}</span>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-900/75 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-sage-600/90 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          After
        </span>

        {/* Divider + grab handle. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(27,27,25,0.12)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-700 shadow-lift">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Invisible range input layered over the frame for keyboard control. */}
        <label className="absolute inset-0 cursor-ew-resize">
          <span className="sr-only">
            Reveal the before and after of {item.title}. Left shows before, right shows after.
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            className="peer h-full w-full cursor-ew-resize opacity-0"
            aria-valuetext={`${Math.round(pos)}% before`}
          />
          {/* The input itself is invisible, so the global focus ring is too.
              This sibling draws one when the input has keyboard focus. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-sage-600 ring-offset-2 ring-offset-sand-50 transition-opacity peer-focus-visible:opacity-100"
          />
        </label>
      </div>

      <figcaption className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sage-50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-sage-700">
            {item.service}
          </span>
          {item.area && <span className="text-[0.8125rem] text-ink-500">{item.area}</span>}
        </div>
        <Heading className="mt-2.5 font-sans text-[1.0625rem] font-semibold text-ink-900">
          {item.title}
        </Heading>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{item.caption}</p>
      </figcaption>
    </figure>
  );
}
