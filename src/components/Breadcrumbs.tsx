import Link from 'next/link';

/**
 * Visible breadcrumbs. Pair with breadcrumbSchema() so Google can render the
 * trail in the search result instead of the raw URL.
 */
export default function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-500">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-sage-700">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-ink-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
