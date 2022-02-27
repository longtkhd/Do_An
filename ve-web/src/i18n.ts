import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nConstants } from '@/constants';
import { i18nHelpers } from '@/helpers';

const { RESOURCES, REGIONS, DEFAULT_LANG } = i18nConstants;

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  lng: i18nHelpers.getCurrentLanguage(),
  fallbackLng: REGIONS[DEFAULT_LANG].key,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
