import type { MDXComponents } from 'mdx/types';
import { compileMDX } from 'next-mdx-remote/rsc';

export type TableOfContents = Array<{
  title: string;
  url: string;
  depth: number;
}>;

// Custom MDX components - add your own here
export const mdxComponents: MDXComponents = {};

/**
 * Extract table of contents from markdown source by parsing heading syntax
 */
function extractTableOfContents(source: string): TableOfContents {
  const headings: TableOfContents = [];
  const lines = source.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const title = match[2].trim();
      const url = `#${title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')}`;

      headings.push({ title, url, depth });
    }
  });

  return headings;
}

export async function compileMdx<
  Frontmatter extends object = Record<string, unknown>,
>({
  source,
}: {
  source: string;
  filePath?: string;
}): Promise<{
  body: React.ReactElement;
  frontmatter: Frontmatter;
  toc: TableOfContents;
}> {
  // Extract TOC from source
  const toc = extractTableOfContents(source);

  // Compile MDX using next-mdx-remote
  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    body: content,
    frontmatter: frontmatter as Frontmatter,
    toc,
  };
}
