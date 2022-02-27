import { CmsStoresContext } from '@/contexts';
import { useContext } from 'react';

export const useCmsStores = () => {
  const context = useContext(CmsStoresContext);
  if (!context) {
    throw new Error(
      'useCmsStores must be inside a CmsStoresContextProvider with a state value'
    );
  }
  return context;
};
