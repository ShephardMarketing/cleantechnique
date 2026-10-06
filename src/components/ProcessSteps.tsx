import { processSteps } from '@/lib/content';

export default function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s) => (
        <li key={s.step} className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
          {/* Lavender here picks up the sprigs in the logo without competing
              with the eucalyptus used for links and buttons. */}
          <span className="font-display text-[2rem] font-semibold leading-none text-lav-300">
            {s.step}
          </span>
          <h3 className="mt-3 font-sans text-[1.0625rem] font-semibold text-ink-900">{s.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
