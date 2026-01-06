import { getLastModified } from '@/lib/git';
import { getSiteUrl } from '@/lib/server-utils';
import routes from '@/lib/routes';
import { type SitemapEntry } from '@/types';

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = getSiteUrl();

  const entries = await Promise.all(
    routes.map(async (item): Promise<SitemapEntry> => {
      const lastModified = await getLastModified(item.path);

      return {
        url: baseUrl + item.resolved,
        lastModified: lastModified || new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: item.priority || 0.7,
      };
    }),
  );

  return entries;
}
