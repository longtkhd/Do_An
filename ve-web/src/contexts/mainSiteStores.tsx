import { createContext } from 'react';
import commonStore, { CommonStore } from '@/stores/main-site/commonStore';
import lobbyStore, { LobbyStore } from '@/stores/main-site/lobbyStore';
import boothStore, { BoothStore } from '@/stores/main-site/boothStore';
import hallStore, { HallStore } from '@/stores/main-site/hallStore';
import resourceHubStore, {
  ResourceHubStore,
} from '@/stores/main-site/resourceHubStore';
import stageStore, { StageStore } from '@/stores/main-site/stageStore';

export class MainSiteStoreModel {
  commonStore: CommonStore;
  lobbyStore: LobbyStore;
  boothStore: BoothStore;
  hallStore: HallStore;
  resourceHubStore: ResourceHubStore;
  stageStore: StageStore;
  constructor() {
    this.commonStore = commonStore;
    this.lobbyStore = lobbyStore;
    this.boothStore = boothStore;
    this.hallStore = hallStore;
    this.resourceHubStore = resourceHubStore;
    this.stageStore = stageStore;
  }
}

export const mainSiteStores = new MainSiteStoreModel();
export const MainSiteStoresContext = createContext<MainSiteStoreModel>(
  mainSiteStores
);
