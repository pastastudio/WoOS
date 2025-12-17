import { getEnvSafely } from '@/env/config';
import { packageUtils } from './server-utils';

interface GitHubCommit {
  commit: {
    committer: {
      date: string;
    };
  };
}

/**
 * Fetches the last modified date of a file from GitHub
 * Automatically reads repository information from package.json
 *
 * @param filePath - the file path relative to the repository root
 * @param options - optional configuration
 * @param options.repo - override repository (format: "owner/repo"), defaults to package.json
 * @param options.branch - specific branch to check, defaults to default branch
 * @returns the ISO date string of the last commit or null if not found
 */
export async function getLastModified(
  filePath: string,
  options?: { repo?: string; branch?: string },
): Promise<string | null> {
  const repo = options?.repo || packageUtils.getGitHubRepo();

  if (!repo) {
    console.error('No repository configured');
    return null;
  }

  const params = new URLSearchParams({
    path: filePath,
    page: '1',
    per_page: '1',
  });

  if (options?.branch) {
    params.set('sha', options.branch);
  }

  const url = `https://api.github.com/repos/${repo}/commits?${params}`;

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    };

    // Try to get GitHub token (optional, but increases rate limits)
    try {
      const token = getEnvSafely('GITHUB_TOKEN');
      headers['Authorization'] = `Bearer ${token}`;
    } catch {
      // Token is optional, continue without it
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js
    });

    if (!res.ok) {
      console.warn(
        `Failed to fetch last modified date for ${filePath}: ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const data = (await res.json()) as GitHubCommit[];
    return data[0]?.commit?.committer?.date || null;
  } catch (error) {
    console.error(`Error fetching last modified date for ${filePath}:`, error);
    return null;
  }
}
