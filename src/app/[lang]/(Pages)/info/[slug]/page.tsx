import { MarkdownContentWrapper } from '@/components/ui/base/markdown-content-wrapper';
import { MarkdownToc } from '@/components/ui/base/markdown-toc';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import {
  getAllRoutes,
  getContent,
  getPageRoute,
  type RouteEntry,
} from '@/lib/content';
import { compileMdx } from '@/lib/markdown';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

async function generateNavigationSidebar(
  locale: string,
  section: 'info' | 'docs',
  currentSlug: string,
) {
  const routes = await getAllRoutes(locale, section);

  if (!routes?.length) {
    return <p>No entries yet.</p>;
  }

  return (
    <nav>
      <h2 className='text-foreground mb-2 text-base font-semibold'>
        Navigation
      </h2>
      <div className='flex flex-col items-end'>
        <ul className='text-muted-foreground space-y-3 pl-3 text-sm'>
          {routes.map((route) => {
            const isActive = route.slug === currentSlug;
            return (
              <li key={`${route.lang}-${route.section}-${route.slug}`}>
                <Link
                  href={`/${route.lang}/${route.section}/${route.slug}`}
                  className='hover:text-foreground/80 transition-colors'
                  style={isActive ? { color: '#00a63e' } : undefined}
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

function getCircularNavUrl(
  direction: 'prev' | 'next',
  routes: RouteEntry[],
  currentSlug: string,
  locale: string,
  section: 'info' | 'docs',
) {
  if (!routes?.length) return '#';
  const currentIndex = routes.findIndex((r) => r.slug === currentSlug);
  if (currentIndex === -1) return '#';

  let nextIndex;
  if (direction === 'next') {
    nextIndex = (currentIndex + 1) % routes.length;
  } else {
    nextIndex = (currentIndex - 1 + routes.length) % routes.length;
  }
  return `/${locale}/${section}/${routes[nextIndex]?.slug || '#'}`;
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  const section: 'info' | 'docs' = 'info';

  try {
    getPageRoute(lang, section, slug);
  } catch {
    notFound();
  }

  const { source, filePath } = await getContent(lang, section, slug);
  const {
    body: Content,
    toc,
    frontmatter,
    header,
  } = await compileMdx({
    source,
    filePath,
  });

  // Redirect old file-based slugs to frontmatter-based ones
  if (header.filename && header.filename !== slug) {
    redirect(`/${lang}/${section}/${header.filename}`);
  }

  const routes = await getAllRoutes(lang, section);

  // Get circular navigation URLs
  const prevUrl = getCircularNavUrl('prev', routes, slug, lang, section);
  const nextUrl = getCircularNavUrl('next', routes, slug, lang, section);

  // Generate sidebar content
  const navigationSidebar = await generateNavigationSidebar(
    lang,
    section,
    slug,
  );

  return (
    <MarkdownLayout
      leftSidebar={navigationSidebar}
      content={
        <MarkdownContentWrapper
          title={(frontmatter as { title?: string } | undefined)?.title}
          description={
            (frontmatter as { description?: string } | undefined)?.description
          }
          badges={(frontmatter as { badges?: string[] } | undefined)?.badges}
          prevUrl={prevUrl}
          nextUrl={nextUrl}
        >
          {Content}
        </MarkdownContentWrapper>
      }
      rightSidebar={<MarkdownToc toc={toc} />}
    />
  );
}
