import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import chainedBackend from 'i18next-chained-backend';
import localStorageBackend from 'i18next-localstorage-backend';
import { languages } from './languages';

export const initI18N = i18n
  .use(chainedBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: languages,
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      backends: [localStorageBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
      ],
    },
  });

export { i18n };
