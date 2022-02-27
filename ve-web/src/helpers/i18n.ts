import { i18nConstants, localStorageConstants } from '@/constants';
const { I18N } = localStorageConstants;
const { REGIONS, DEFAULT_LANG } = i18nConstants;

const getCurrentLanguage = () => {
  const language = localStorage.getItem(I18N) || REGIONS[DEFAULT_LANG].key;
  return language;
};

const changeLanguage = (language: string) => {
  if (language === getCurrentLanguage()) return;
  localStorage.setItem(I18N, language);
  window.location.reload();
};

export default {
  getCurrentLanguage,
  changeLanguage,
};
