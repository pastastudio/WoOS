import fs from 'fs';
import path from 'path';

export type RouteEntry = {
  locale: string;
  section: 'info' | 'docs';
  slug: string; // slug used in URL and navigation
  title?: string; // title from frontmatter
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readFrontmatterFilename(filePath: string): string | undefined {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return undefined;
  const frontmatter = match[1];
  for (const line of frontmatter.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (!key || rest.length === 0) continue;
    if (key.trim() === 'filename') {
      return rest
        .join(':')
        .trim()
        .replace(/^['"]|['"]$/g, '');
    }
  }
  return undefined;
}

function readFrontmatterTitle(filePath: string): string | undefined {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return undefined;
  const frontmatter = match[1];
  for (const line of frontmatter.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (!key || rest.length === 0) continue;
    if (key.trim() === 'title') {
      return rest
        .join(':')
        .trim()
        .replace(/^['"]|['"]$/g, '');
    }
  }
  return undefined;
}

function listContentFiles(locale: string, section: 'info' | 'docs') {
  const dirPath = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dirPath)) return [] as string[];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => path.join(dirPath, file));
}

function listRootContentFiles(locale: string) {
  const dirPath = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dirPath)) return [] as string[];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => path.join(dirPath, file));
}

export function getRootContent(locale: string, slug: string) {
  const files = listRootContentFiles(locale);
  const match = files.find((file) => {
    const fmName = readFrontmatterFilename(file);
    const fallbackSlug = path.basename(file, '.mdx');
    return (
      fmName?.toLowerCase() === slug.toLowerCase() || fallbackSlug === slug
    );
  });

  if (!match) {
    throw new Error('Content not found');
  }

  const source = fs.readFileSync(match, 'utf8');

  return { source, filePath: match } as const;
}

export function getContent(
  locale: string,
  section: 'info' | 'docs',
  slug: string,
) {
  // slug may be a frontmatter filename; resolve by scanning files
  const files = listContentFiles(locale, section);
  const match = files.find((file) => {
    const fmName = readFrontmatterFilename(file);
    const fallbackSlug = path.basename(file, '.mdx');
    return fmName === slug || fallbackSlug === slug;
  });

  if (!match) {
    throw new Error('Content not found');
  }

  const source = fs.readFileSync(match, 'utf8');

  return { source, filePath: match } as const;
}

export function getAllSlugs(
  locale: string,
  section: 'info' | 'docs',
): string[] {
  return listContentFiles(locale, section).map((file) => {
    const fmName = readFrontmatterFilename(file);
    return fmName ?? path.basename(file, '.mdx');
  });
}

export function getAllRoutes(
  locale: string,
  section: 'info' | 'docs',
): RouteEntry[] {
  return listContentFiles(locale, section).map((file) => ({
    locale,
    section,
    slug: readFrontmatterFilename(file) ?? path.basename(file, '.mdx'),
    title: readFrontmatterTitle(file),
  }));
}

export function getPageRoute(
  locale: string,
  section: 'info' | 'docs',
  slug: string,
): RouteEntry {
  const files = listContentFiles(locale, section);
  const match = files.find((file) => {
    const fmName = readFrontmatterFilename(file);
    const fallbackSlug = path.basename(file, '.mdx');
    return fmName === slug || fallbackSlug === slug;
  });

  if (!match) {
    throw new Error('Content not found');
  }

  const resolvedSlug =
    readFrontmatterFilename(match) ?? path.basename(match, '.mdx');
  return { locale, section, slug: resolvedSlug };
}
