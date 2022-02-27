import { MainSiteStoresContext } from '@/contexts';
import { useContext } from 'react';

export const useMainSiteStores = () => {
  const context = useContext(MainSiteStoresContext);
  if (!context) {
    throw new Error(
      'useMainSiteStores must be inside a MainSiteStoresContextProvider with a state value'
    );
  }
  return context;
};
