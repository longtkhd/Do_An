import viFlag from '@/assets/images/flags/vi.svg';
import enFlag from '@/assets/images/flags/en.svg';
import viTrans from '@/assets/i18n/vi.json';
import enTrans from '@/assets/i18n/en.json';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import { IRegion } from '@/interfaces';

const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
};

const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    flag: viFlag,
    antdLocale: viVN,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: enFlag,
    antdLocale: enUS,
  },
};

const DEFAULT_LANG = 'en';

export default {
  RESOURCES,
  REGIONS,
  DEFAULT_LANG,
};
