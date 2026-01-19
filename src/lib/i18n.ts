function getDictionary(lang: string) {
  switch (lang) {
    case 'de':
      return import('@dic/de/common.json').then((m) => m.default);
    case 'en':
    default:
      return import('@dic/en/common.json').then((m) => m.default);
  }
}

export { getDictionary };
