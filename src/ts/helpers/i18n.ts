import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from 'ts/translations/de';
import en from 'ts/translations/en';
import es from 'ts/translations/es';
import fr from 'ts/translations/fr';
import pt from 'ts/translations/pt';
import ru from 'ts/translations/ru';
import localization from './Localization';

function getJsonFromString(text: string) {
  return text
    .split('§ ')
    .slice(1)
    .reduce((translations, part: string) => {
      let index = part.indexOf('\n');
      if (index === (part.length - 1)) {
        index = part.indexOf(':');
      }

      const key = part.slice(0, index);
      translations[key] = part.slice(index + 1).trim();

      return translations;
    }, {});
}

function getTranslationWrapper(translation: string) {
  return {
    translation: getJsonFromString(translation),
  };
}

const translations = {
  de: getTranslationWrapper(de),
  en: getTranslationWrapper(en),
  es: getTranslationWrapper(es),
  fr: getTranslationWrapper(fr),
  pt: getTranslationWrapper(pt),
  ru: getTranslationWrapper(ru),
};

export const BROWSER_LANGUAGE = navigator.languages
  .filter((language) => language.length === 2 && translations[language])
  .shift() || 'en';

export default function initializationI18n(userLanguage?: string) {
  const language = userLanguage
    || localStorage.getItem('language')
    || BROWSER_LANGUAGE
    || 'en';

  localization.language = language;

  i18next.use(initReactI18next).init({
    lng: language, // if you're using a language detector, do not define the lng option
    debug: false,
    resources: translations,
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
  });
}

export function onChangeLanguage(i18n: any, code: string) {
  if (!code) return;
  localization.language = code;
  i18n.changeLanguage(code);
  if (code === BROWSER_LANGUAGE) {
    localStorage.removeItem('language');
  } else {
    localStorage.setItem('language', code);
  }
}
