import { createContext } from 'react';
import authStore, { AuthStore } from '@/stores/common/authStore';
import commonStore, { CommonStore } from '@/stores/common/commonStore';
import chatStore, { ChatStore } from '@/stores/common/chatStore';

export class CommonStoreModel {
  authStore: AuthStore;
  commonStore: CommonStore;
  chatStore: ChatStore;
  constructor() {
    this.authStore = authStore;
    this.commonStore = commonStore;
    this.chatStore = chatStore;
  }
}

export const commonStores = new CommonStoreModel();
export const CommonStoresContext = createContext<CommonStoreModel>(
  commonStores
);
