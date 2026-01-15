import { InfoLayout } from '@/layouts/InfoLayout';
import { getAllRoutes, getContent, getPageRoute } from '@/lib/content';
import { compileMdx } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  try {
    getPageRoute(locale, 'info', slug);
  } catch {
    notFound();
  }

  const { source, filePath } = await getContent(locale, 'info', slug);
  const {
    body: Content,
    toc,
    frontmatter,
  } = await compileMdx({
    source,
    filePath,
  });
  const routes = await getAllRoutes(locale, 'info');

  return (
    <InfoLayout
      routes={routes}
      toc={toc}
      title={(frontmatter as { title?: string } | undefined)?.title}
      content={Content}
    />
  );
}
