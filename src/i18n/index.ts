import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import uk from './locales/uk';
import ru from './locales/ru';
import es from './locales/es';

export type SupportedLanguage = 'en' | 'uk' | 'ru' | 'es';

const STORAGE_KEY = 'pfc_lang';

function getStoredLanguage(): SupportedLanguage | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'en' || raw === 'uk' || raw === 'ru' || raw === 'es') return raw;
  return null;
}

/**
 * English is the default language (as requested).
 * Later we can add auto-detect from Telegram `language_code` here.
 */
const initialLanguage: SupportedLanguage = getStoredLanguage() ?? 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
    ru: { translation: ru },
    es: { translation: es },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export function setAppLanguage(lng: SupportedLanguage) {
  localStorage.setItem(STORAGE_KEY, lng);
  void i18n.changeLanguage(lng);
}

export default i18n;

