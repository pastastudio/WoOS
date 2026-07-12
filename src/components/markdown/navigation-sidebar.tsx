import { MARKDOWN_ACTIVE_COLOR } from '@/components/markdown/markdown-colors';
import { getAllRoutes } from '@/lib/content';
import Link from 'next/link';

/** Renders the "you are here" navigation list for a markdown section (information/docs). */
export async function generateNavigationSidebar(
  locale: string,
  section: 'information' | 'docs',
  currentSlug: string
) {
  const routes = await getAllRoutes(locale, section);

  if (!routes?.length) {
    return <p>No entries yet.</p>;
  }

  return (
    <nav>
      <h2 className="text-foreground mb-2 text-base font-semibold">Navigation</h2>
      <div className="flex flex-col items-end">
        <ul className="text-muted-foreground space-y-3 pl-3 text-sm">
          {routes.map(route => {
            const isActive = route.slug === currentSlug;
            return (
              <li key={`${route.lang}-${route.section}-${route.slug}`}>
                <Link
                  href={`/${route.section}/${route.slug}`}
                  className="hover:text-foreground/80 transition-colors"
                  style={isActive ? { color: MARKDOWN_ACTIVE_COLOR } : undefined}
                >
                  {route.title || route.slug}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
