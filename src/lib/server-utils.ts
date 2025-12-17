import * as fs from 'node:fs';
import * as path from 'node:path';
/**
 * Package.json utilities (Server-side only)
 */
export const packageUtils = {
  /**
   * Finds and reads package.json from the project root
   * @returns parsed package.json content or null if not found
   */
  readPackageJson<T = unknown>(): T | null {
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
      return JSON.parse(packageJsonContent) as T;
    } catch (error) {
      console.error('Failed to read package.json:', error);
      return null;
    }
  },

  /**
   * Gets the project root directory (where package.json is located)
   * @returns absolute path to project root or null if not found
   */
  getProjectRoot(): string | null {
    try {
      let currentDir = process.cwd();

      // Walk up the directory tree to find package.json
      while (currentDir !== path.parse(currentDir).root) {
        const packageJsonPath = path.join(currentDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          return currentDir;
        }
        currentDir = path.dirname(currentDir);
      }

      console.warn('package.json not found in directory tree');
      return null;
    } catch (error) {
      console.error('Failed to find project root:', error);
      return null;
    }
  },

  /**
   * Extracts the GitHub repository owner and name from package.json
   * Supports various repository URL formats
   * @returns repository in format "owner/repo" or null if not found
   */
  getGitHubRepo(): string | null {
    interface PackageJson {
      repository?: {
        type?: string;
        url?: string;
      };
    }

    const packageJson = this.readPackageJson<PackageJson>();

    if (!packageJson) {
      return null;
    }

    const repoUrl = packageJson.repository?.url;

    if (!repoUrl) {
      console.warn('No repository URL found in package.json');
      return null;
    }

    // Handle formats like:
    // - git+https://github.com/owner/repo.git
    // - https://github.com/owner/repo
    // - git@github.com:owner/repo.git
    const match = repoUrl.match(
      /github\.com[/:]([\w-]+)\/([\w-]+?)(?:\.git)?$/,
    );

    if (!match) {
      console.warn(`Could not parse GitHub repository from: ${repoUrl}`);
      return null;
    }

    return `${match[1]}/${match[2]}`;
  },

  /**
   * Reads the CNAME file and returns the domain
   * @returns domain name or null if not found
   */
  getCNAME(): string | null {
    try {
      const cnamePath = path.join(process.cwd(), 'CNAME');

      if (!fs.existsSync(cnamePath)) {
        console.warn('CNAME file not found');
        return null;
      }

      const domain = fs.readFileSync(cnamePath, 'utf-8').trim();

      if (!domain) {
        console.warn('CNAME file is empty');
        return null;
      }

      return domain;
    } catch (error) {
      console.error('Failed to read CNAME file:', error);
      return null;
    }
  },
};

/**
 * Ensures a URL has a protocol (defaults to https)
 */
function ensureProtocol(url: string): string {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/**
 * Resolves the public site URL using the following precedence:
 * 1. Explicit env vars: NEXT_PUBLIC_SITE_URL or SITE_URL
 * 2. Vercel deployment env: VERCEL_URL (hostname only, add https)
 * 3. Custom domain from CNAME file (GitHub Pages / static hosting)
 * 4. Fallback: http://localhost:3000
 *
 * Use this for generating absolute links (sitemap, OG tags, canonical URLs)
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit) return ensureProtocol(explicit.trim());

  const vercel = process.env.VERCEL_URL; // Provided by Vercel (no protocol)
  if (vercel) return ensureProtocol(vercel.trim());

  const cname = packageUtils.getCNAME();
  if (cname) return ensureProtocol(cname.trim());

  return 'http://localhost:3000';
}

/**
 * Convenience function to build absolute URLs from a pathname
 */
export function buildAbsoluteUrl(pathname: string): string {
  const base = getSiteUrl().replace(/\/$/, '');
  const pathClean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return base + pathClean;
}
