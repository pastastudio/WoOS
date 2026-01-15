import fs from 'fs';
import path from 'path';

export type RouteEntry = {
  locale: string;
  section: 'info' | 'docs';
  slug: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function resolveContentPath(
  locale: string,
  section: 'info' | 'docs',
  slug: string,
) {
  return path.join(CONTENT_DIR, locale, section, `${slug}.mdx`);
}

export function getContent(
  locale: string,
  section: 'info' | 'docs',
  slug: string,
) {
  const filePath = resolveContentPath(locale, section, slug);

  if (!fs.existsSync(filePath)) {
    throw new Error('Content not found');
  }

  const source = fs.readFileSync(filePath, 'utf8');

  return { source, filePath } as const;
}

export function getAllSlugs(
  locale: string,
  section: 'info' | 'docs',
): string[] {
  const dirPath = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

export function getAllRoutes(
  locale: string,
  section: 'info' | 'docs',
): RouteEntry[] {
  const dirPath = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      locale,
      section,
      slug: file.replace('.mdx', ''),
    }));
}

export function getPageRoute(
  locale: string,
  section: 'info' | 'docs',
  slug: string,
): RouteEntry {
  const filePath = resolveContentPath(locale, section, slug);

  if (!fs.existsSync(filePath)) {
    throw new Error('Content not found');
  }

  return { locale, section, slug };
}
