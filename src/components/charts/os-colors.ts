// Official OS brand colors — intentionally not part of the app's design-token
// system (they represent specific OS vendors, not semantic UI state).
// Values must stay in sync with the --color-brand-windows/linux/macos tokens
// in globals.css (kept as literal hex here since recharts fill/stroke props
// don't reliably resolve CSS var() on SVG presentation attributes).
export const OS_BRAND_COLORS = {
  windows: '#0078D4', // Microsoft Blue
  linux: '#FCC624', // Linux Yellow
  macos: '#A2AAAD', // Apple Gray
} as const;
