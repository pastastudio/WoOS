import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';

export type TableOfContents = Array<{
  title: string;
  url: string;
  depth: number;
}>;

export type HeaderMeta = {
  title?: string;
  description?: string;
  filename?: string;
};

function normalizeSource(source: string) {
  return source.replace(/\r\n/g, '\n');
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

function stripFrontmatter(source: string): {
  content: string;
  header: HeaderMeta;
} {
  const normalized = normalizeSource(source);
  const frontmatterMatch = normalized.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!frontmatterMatch) {
    return { content: normalized, header: {} };
  }

  const frontmatterRaw = frontmatterMatch[1];
  const content = normalized.slice(frontmatterMatch[0].length);
  const header: HeaderMeta = {};

  frontmatterRaw.split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (!key || rest.length === 0) return;
    const value = rest
      .join(':')
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (key.trim() === 'title') header.title = value;
    if (key.trim() === 'description') header.description = value;
    if (key.trim() === 'filename') header.filename = value;
  });

  return { content, header };
}

/**
 * Extract table of contents from markdown source by parsing heading syntax (h1-h4)
 */
export function extractTableOfContents(source: string): TableOfContents {
  const { content } = stripFrontmatter(source);
  const headings: TableOfContents = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const title = match[2].trim();
      const url = `#${slugify(title)}`;

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
  body: ReactElement;
  frontmatter: Frontmatter;
  toc: TableOfContents;
  header: HeaderMeta;
}> {
  const normalizedSource = normalizeSource(source);

  // Extract header and TOC from raw source (frontmatter stripped for TOC)
  const { header: parsedHeader } = stripFrontmatter(normalizedSource);
  const toc = extractTableOfContents(normalizedSource);

  // Compile MDX using next-mdx-remote (keeps frontmatter intact)
  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: normalizedSource,
    options: {
      parseFrontmatter: true,
    },
  });

  const header: HeaderMeta = {
    title:
      ((frontmatter as Record<string, unknown>).title as string | undefined) ??
      parsedHeader.title,
    description:
      ((frontmatter as Record<string, unknown>).description as
        | string
        | undefined) ?? parsedHeader.description,
    filename:
      ((frontmatter as Record<string, unknown>).filename as
        | string
        | undefined) ?? parsedHeader.filename,
  };

  return {
    body: content,
    frontmatter: frontmatter as Frontmatter,
    toc,
    header,
  };
}
