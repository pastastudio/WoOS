// Decorative per-variant cursor colors, sourced from the --color-decorative-*
// tokens in globals.css. Single source of truth for both the solid sparkle
// color and its derived translucent glow.
export const CURSOR_SPARKLE_COLORS = {
  crystalScepter: 'var(--color-decorative-amber)',
  fireSnake: 'var(--color-decorative-sky)',
  flowerstaff: 'var(--color-decorative-pink)',
  default: 'var(--color-decorative-gold)',
} as const;

export const CURSOR_GLOW_COLORS = {
  crystalScepter: 'color-mix(in srgb, var(--color-decorative-amber) 65%, transparent)',
  fireSnake: 'color-mix(in srgb, var(--color-decorative-sky) 60%, transparent)',
  flowerstaff: 'color-mix(in srgb, var(--color-decorative-pink) 60%, transparent)',
  defaultBlack: 'color-mix(in srgb, var(--background) 40%, transparent)',
  defaultWhite: 'color-mix(in srgb, var(--foreground) 55%, transparent)',
} as const;
