
import enTranslations from './en.json';
import frTranslations from './fr.json';

const translations = {
  en: enTranslations,
  fr: frTranslations
};

export function translation(key, lang = 'en') {
  return translations[lang][key] || key;
}