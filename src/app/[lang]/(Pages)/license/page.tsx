import { MarkdownContentWrapper } from '@/components/ui/base/markdown-content-wrapper';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import { getRootContent } from '@/lib/content';
import { compileMdx } from '@/lib/markdown';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const slug = 'license';

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
  } = await compileMdx({
    source,
    filePath,
  });

  if (header.filename && header.filename.toLowerCase() !== slug) {
    redirect(`/${lang}/${header.filename}`);
  }

  return (
    <MarkdownLayout
      leftSidebar={' '}
      content={
        <MarkdownContentWrapper
          title={(frontmatter as { title?: string } | undefined)?.title}
          description={
            (frontmatter as { description?: string } | undefined)?.description
          }
          badges={(frontmatter as { badges?: string[] } | undefined)?.badges}
          showHeader={false}
          showInfo={true}
          showFooter={false}
        >
          {Content}
        </MarkdownContentWrapper>
      }
      rightSidebar={' '}
    />
  );
}
