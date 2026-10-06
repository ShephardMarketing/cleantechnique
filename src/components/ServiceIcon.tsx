import type { Service } from '@/lib/services';

const paths: Record<Service['icon'], React.ReactNode> = {
  spray: (
    <>
      <path d="M9 8h5v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" />
      <path d="M10 8V5h3v3" />
      <path d="M14 10h3l2-2" />
      <path d="M19 5v.01M22 7v.01M20.5 10v.01" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 4.9L19 9.7l-5.2 1.8L12 16.4l-1.8-4.9L5 9.7l5.2-1.8L12 3Z" />
      <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </>
  ),
  boxes: (
    <>
      <path d="M3 8l9-4 9 4-9 4-9-4Z" />
      <path d="M3 8v8l9 4 9-4V8" />
      <path d="M12 12v8" />
    </>
  ),
  shelf: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 10h16M4 15h16" />
      <path d="M9 4v6M15 10v5" />
    </>
  ),
  hardhat: (
    <>
      <path d="M3 17h18" />
      <path d="M5 17v-2a7 7 0 0 1 14 0v2" />
      <path d="M10 8V5h4v3" />
      <path d="M3 20h18" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l9 9" />
      <path d="M17 17l2-2M19.5 19.5l1.5-1.5" />
    </>
  ),
  concierge: (
    <>
      <path d="M4 18h16" />
      <path d="M5 18v-1a7 7 0 0 1 14 0v1" />
      <path d="M12 7V5" />
      <path d="M10 5h4" />
      <path d="M3 21h18" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className = 'h-6 w-6',
}: {
  name: Service['icon'];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
