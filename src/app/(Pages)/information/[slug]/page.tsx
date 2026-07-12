import { generateNavigationSidebar } from '@/components/markdown/navigation-sidebar';
import { MarkdownContent } from '@/components/markdown/markdown-content';
import { MarkdownToc } from '@/components/markdown/markdown-toc';
import { PagePreload } from '@/components/withPagePreload';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import { getAllRoutes, getContent, getPageRoute } from '@/lib/content';
import { getCircularNavUrl } from '@/lib/information-nav';
import { getLocale } from '@/lib/locale';
import { compileMdx } from '@/lib/markdown';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const lang = await getLocale();
  const section: 'information' | 'docs' = 'information';

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
    redirect(`/${section}/${header.filename}`);
  }

  const routes = await getAllRoutes(lang, section);

  // Get circular navigation URLs
  const prevUrl = getCircularNavUrl('prev', routes, slug, section);
  const nextUrl = getCircularNavUrl('next', routes, slug, section);

  // Generate sidebar content
  const navigationSidebar = await generateNavigationSidebar(lang, section, slug);

  return (
    <PagePreload>
      <MarkdownLayout
        leftSidebar={navigationSidebar}
        content={
          <MarkdownContent
            title={(frontmatter as { title?: string } | undefined)?.title}
            description={(frontmatter as { description?: string } | undefined)?.description}
            badges={(frontmatter as { badges?: string[] } | undefined)?.badges}
            prevUrl={prevUrl}
            nextUrl={nextUrl}
          >
            {Content}
          </MarkdownContent>
        }
        rightSidebar={<MarkdownToc toc={toc} />}
      />
    </PagePreload>
  );
}
