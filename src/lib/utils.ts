import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names intelligently using clsx and tailwind-merge
 * Useful for combining Tailwind classes and conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * String utilities
 */
export const stringUtils = {
  /**
   * Truncates a string to a specified length and adds an ellipsis
   */
  truncate(str: string, length: number, suffix = '...'): string {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },

  /**
   * Converts a string to a URL-friendly slug
   */
  slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Capitalizes the first letter of a string
   */
  capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Capitalizes the first letter of each word
   */
  titleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Extracts initials from a name
   */
  getInitials(name: string, maxLength = 2): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, maxLength);
  },
};

/**
 * Number and formatting utilities
 */
export const formatUtils = {
  /**
   * Formats a number with thousand separators
   */
  formatNumber(num: number, locale = 'de-DE'): string {
    return new Intl.NumberFormat(locale).format(num);
  },

  /**
   * Formats a number as currency
   */
  formatCurrency(amount: number, currency = 'EUR', locale = 'de-DE'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  },

  /**
   * Formats a number as percentage
   */
  formatPercent(value: number, decimals = 0): string {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  /**
   * Formats bytes to human-readable size
   */
  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  },
};

/**
 * Array utilities
 */
export const arrayUtils = {
  /**
   * Chunks an array into smaller arrays of a specified size
   */
  chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Removes duplicate values from an array
   */
  unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  },

  /**
   * Shuffles an array randomly
   */
  shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Groups array elements by a key function
   */
  groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
    return array.reduce(
      (groups, item) => {
        const key = keyFn(item);
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      },
      {} as Record<string, T[]>,
    );
  },
};

/**
 * Object utilities
 */
export const objectUtils = {
  /**
   * Deep clones an object
   */
  deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Picks specified keys from an object
   */
  pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  /**
   * Omits specified keys from an object
   */
  omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => {
      delete result[key];
    });
    return result;
  },

  /**
   * Merges two objects deeply
   */
  deepMerge<T extends object>(target: T, source: Partial<T>): T {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        const sourceValue = source[key as keyof T];
        const targetValue = target[key as keyof T];
        if (isObject(sourceValue) && isObject(targetValue)) {
          (output as Record<string, unknown>)[key] = objectUtils.deepMerge(
            targetValue as object,
            sourceValue as object,
          );
        } else {
          (output as Record<string, unknown>)[key] = sourceValue;
        }
      });
    }
    return output;
  },
};

function isObject(item: unknown): item is object {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Validation utilities
 */
export const validationUtils = {
  /**
   * Validates an email address
   */
  isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validates a URL
   */
  isUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Checks if a string is empty or only whitespace
   */
  isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
  },

  /**
   * Validates a phone number (basic validation)
   */
  isPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phoneRegex.test(phone);
  },
};

/**
 * Random utilities
 */
export const randomUtils = {
  /**
   * Generates a random string of specified length
   */
  randomString(length: number, charset = 'alphanumeric'): string {
    const charsets = {
      alphanumeric:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      numeric: '0123456789',
      hex: '0123456789abcdef',
    };
    const chars =
      charsets[charset as keyof typeof charsets] || charsets.alphanumeric;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Generates a random number between min and max
   */
  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Generates a random hex color
   */
  randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  },
};

/**
 * DOM utilities
 */
export const domUtils = {
  /**
   * Copies text to clipboard
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Scrolls to an element smoothly
   */
  scrollToElement(elementId: string, offset = 0): void {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  },

  /**
   * Checks if element is in viewport
   */
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

/**
 * Debounce function - delays execution until after wait time has elapsed
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures function is called at most once per wait period
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}
