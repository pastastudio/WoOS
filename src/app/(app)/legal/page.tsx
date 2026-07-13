import { MarkdownContent } from '@/components/markdown/markdown-content';
import { MarkdownToc } from '@/components/markdown/markdown-toc';
import { MarkdownLayout } from '@/layouts/MarkdownLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRootContent } from '@/lib/content';
import { getLocale } from '@/lib/locale';
import { compileMdx } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function Page() {
  const lang = await getLocale();

  let legalSource: string;
  let legalFilePath: string;
  let licenseSource: string;
  let licenseFilePath: string;

  try {
    const legalResult = getRootContent(lang, 'legal');
    legalSource = legalResult.source;
    legalFilePath = legalResult.filePath;

    const licenseResult = getRootContent(lang, 'license');
    licenseSource = licenseResult.source;
    licenseFilePath = licenseResult.filePath;
  } catch {
    notFound();
  }

  const {
    body: LegalContent,
    frontmatter: legalFrontmatter,
    toc: legalToc,
  } = await compileMdx({
    source: legalSource,
    filePath: legalFilePath,
  });

  const { body: LicenseContent, frontmatter: licenseFrontmatter } = await compileMdx({
    source: licenseSource,
    filePath: licenseFilePath,
  });

  return (
    <MarkdownLayout
      leftSidebar={' '}
      content={
        <Tabs defaultValue="legal">
          <TabsList>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="license">License</TabsTrigger>
          </TabsList>
          <TabsContent value="legal">
            <MarkdownContent
              title={(legalFrontmatter as { title?: string } | undefined)?.title}
              description={(legalFrontmatter as { description?: string } | undefined)?.description}
              badges={(legalFrontmatter as { badges?: string[] } | undefined)?.badges}
              showHeader={false}
              showInfo={true}
              showFooter={false}
            >
              {LegalContent}
            </MarkdownContent>
          </TabsContent>
          <TabsContent value="license">
            <MarkdownContent
              title={(licenseFrontmatter as { title?: string } | undefined)?.title}
              description={
                (licenseFrontmatter as { description?: string } | undefined)?.description
              }
              badges={(licenseFrontmatter as { badges?: string[] } | undefined)?.badges}
              showHeader={false}
              showInfo={true}
              showFooter={false}
            >
              {LicenseContent}
            </MarkdownContent>
          </TabsContent>
        </Tabs>
      }
      rightSidebar={<MarkdownToc toc={legalToc} />}
    />
  );
}
