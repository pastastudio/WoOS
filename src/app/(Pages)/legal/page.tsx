import { MarkdownContentWrapper } from '@/components/ui/base/markdown-content-wrapper';
import { MarkdownToc } from '@/components/ui/base/markdown-toc';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import { getRootContent } from '@/lib/content';
import { getLocale } from '@/lib/locale';
import { compileMdx } from '@/lib/markdown';
import { notFound, redirect } from 'next/navigation';

export default async function Page() {
  const lang = await getLocale();
  const slug = 'legal';

  let source: string;
  let filePath: string;

  try {
    const result = getRootContent(lang, slug);
    source = result.source;
    filePath = result.filePath;
  } catch {
    notFound();
    return null;
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
        <MarkdownContentWrapper
          title={(frontmatter as { title?: string } | undefined)?.title}
          description={(frontmatter as { description?: string } | undefined)?.description}
          badges={(frontmatter as { badges?: string[] } | undefined)?.badges}
          showHeader={false}
          showInfo={true}
          showFooter={false}
        >
          {Content}
        </MarkdownContentWrapper>
      }
      rightSidebar={<MarkdownToc toc={toc} />}
    />
  );
}
