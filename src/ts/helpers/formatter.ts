export const ONE_DAY = 24 * 60 * 60 * 1000;

export function getLangPrefix() {
  // @ts-ignore
  const code = window?.localization?.language || 'ru';
  return {
    ru: 'ru-RU',
    en: 'en-EN',
    zh: 'zh-ZH',
    es: 'es-ES',
    fr: 'fr-FR',
    pt: 'pt-PT',
    de: 'de-DE',
    ja: 'ja-JA',
    ko: 'ko-KO',
  }[code] || 'ru-RU';
}

const TIMESTAMP = [
  ONE_DAY * 4,
  ONE_DAY * 5,
  ONE_DAY * 6,
  0,
  ONE_DAY,
  ONE_DAY * 2,
  ONE_DAY * 3,
];

// for performance
const dayNameCache = new Map();
export function getDayName(index:number, weekday: 'long' | 'short') { // @ts-ignore
  const code = window?.localization?.language || 'ru';
  const response = dayNameCache.get(`${code}${index}${weekday}`);
  if (response) return response;

  const date = new Date(TIMESTAMP[index]);
  const dayName = date.toLocaleString(getLangPrefix(), { weekday: weekday || 'long' });
  dayNameCache.set(`${code}${index}${weekday}`, dayName);
  return dayName;
}

export function getCustomDate(timestamp: string, options?: any) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString(getLangPrefix(), options || { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getDate(timestamp: string) {
  return getCustomDate(timestamp, { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getDateForExcel(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().substring(0, 10).split('-').reverse().join('.');
}
