export async function getDictionary(lang: string) {
  switch (lang) {
    case 'de':
      return import('./de/common.json').then((m) => m.default);
    case 'en':
    default:
      return import('./en/common.json').then((m) => m.default);
  }
}