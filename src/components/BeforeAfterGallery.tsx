import { beforeAfters } from '@/lib/content';
import BeforeAfterSlider from './BeforeAfterSlider';

/** Renders nothing if no pairs have been added yet. */
export default function BeforeAfterGallery({
  limit,
  headingAs,
}: {
  limit?: number;
  headingAs?: 'h2' | 'h3';
}) {
  const items = limit ? beforeAfters.slice(0, limit) : beforeAfters;
  if (items.length === 0) return null;

  return (
    <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
      {items.map((item) => (
        <BeforeAfterSlider key={item.id} item={item} headingAs={headingAs} />
      ))}
    </div>
  );
}
