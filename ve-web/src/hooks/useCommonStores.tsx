import { CommonStoresContext } from '@/contexts';
import { useContext } from 'react';

export const useCommonStores = () => {
  const context = useContext(CommonStoresContext);
  if (!context) {
    throw new Error(
      'useCommonStores must be inside a CommonStoresContextProvider with a state value'
    );
  }
  return context;
};
