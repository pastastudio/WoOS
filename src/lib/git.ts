import { getEnvSafely } from '@/env/config';
import { packageUtils } from './server-utils';

type GitHubCommit = {
  commit?: {
    committer?: {
      date?: string;
    };
  };
};

type LastModifiedOptions = {
  repo?: string;
  branch?: string;
  signal?: AbortSignal;
};

const REVALIDATE_SECONDS = 3600;

// Builds the GitHub commits endpoint for the desired file/branch.
const buildCommitsUrl = (repo: string, filePath: string, branch?: string) => {
  const params = new URLSearchParams({
    path: filePath,
    page: '1',
    per_page: '1',
  });

  if (branch) params.set('sha', branch);
  return `https://api.github.com/repos/${repo}/commits?${params}`;
};

// Adds an auth header when a token exists; falls back to anonymous rate limits.
const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };

  try {
    const token = getEnvSafely('GITHUB_TOKEN');
    headers.Authorization = `Bearer ${token}`;
  } catch {
    // Token is optional; GitHub will use unauthenticated limits.
  }

  return headers;
};

// Fetches the last modified date of a file via the GitHub commits API
export async function getLastModified(
  filePath: string,
  options?: LastModifiedOptions,
): Promise<string | null> {
  if (!filePath) {
    console.warn('getLastModified: Missing file path');
    return null;
  }

  const repo = options?.repo ?? packageUtils.getGitHubRepo();

  if (!repo) {
    console.error('getLastModified: No repository configured');
    return null;
  }

  const url = buildCommitsUrl(repo, filePath, options?.branch);

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: options?.signal,
    });

    if (!res.ok) {
      console.warn(
        `getLastModified: Failed for ${filePath} (${res.status} ${res.statusText})`,
      );
      return null;
    }

    const data = (await res.json()) as GitHubCommit[];
    return data[0]?.commit?.committer?.date ?? null;
  } catch (error) {
    console.error(`getLastModified: Error for ${filePath}`, error);
    return null;
  }
}
