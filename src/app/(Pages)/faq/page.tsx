import { MarkdownContent } from '@/components/markdown/markdown-content';
import { MarkdownToc } from '@/components/markdown/markdown-toc';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import { getRootContent } from '@/lib/content';
import { getLocale } from '@/lib/locale';
import { compileMdx } from '@/lib/markdown';
import { notFound, redirect } from 'next/navigation';

export default async function Page() {
  const lang = await getLocale();
  const slug = 'faq';

  let source: string;
  let filePath: string;

  try {
    const result = getRootContent(lang, slug);
    source = result.source;
    filePath = result.filePath;
  } catch {
    notFound();
  }

  const {
    body: Content,
    frontmatter,
    header,
    toc,
  } = await compileMdx({
    source,
    filePath,
  });

  if (header.filename && header.filename.toLowerCase() !== slug) {
    redirect(`/${header.filename}`);
  }

  return (
    <MarkdownLayout
      leftSidebar={' '}
      content={
        <MarkdownContent
          title={(frontmatter as { title?: string } | undefined)?.title}
          description={(frontmatter as { description?: string } | undefined)?.description}
          badges={(frontmatter as { badges?: string[] } | undefined)?.badges}
          showHeader={false}
          showInfo={true}
          showFooter={false}
        >
          {Content}
        </MarkdownContent>
      }
      rightSidebar={<MarkdownToc toc={toc} />}
    />
  );
}
