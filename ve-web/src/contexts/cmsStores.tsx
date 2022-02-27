import { createContext } from 'react';
import roleStore, { RoleStore } from '@/stores/cms/roleStore';
import permissionStore, { PermissionStore } from '@/stores/cms/permissionStore';
import commonStore, { CommonStore } from '@/stores/cms/commonStore';
import userStore, { UserStore } from '@/stores/cms/userStore';
import lobbyStore, { LobbyStore } from '@/stores/cms/lobbyStore';
import hallStore, { HallStore } from '@/stores/cms/hallStore';
import assetStore, { AssetStore } from '@/stores/cms/assetStore';
import stageStore, { StageStore } from '@/stores/cms/stageStore';
import landingStore, { LandingStore } from '@/stores/cms/landingStore';
import boothStore, { BoothStore } from '@/stores/cms/boothStore';
import visitStore, { VisitStore } from '@/stores/cms/visitStore';
import sceneTemplateStore, {
  SceneTemplateStore,
} from '@/stores/cms/sceneTemplateStore';
import resourceHubStore, {
  ResourceHubStore,
} from '@/stores/cms/resourceHubStore';
import collectorStore, { CollectorStore } from '@/stores/cms/collectorStore';

export class CmsStoreModel {
  commonStore: CommonStore;
  roleStore: RoleStore;
  permissionStore: PermissionStore;
  userStore: UserStore;
  lobbyStore: LobbyStore;
  hallStore: HallStore;
  assetStore: AssetStore;
  stageStore: StageStore;
  landingStore: LandingStore;
  boothStore: BoothStore;
  visitStore: VisitStore;
  sceneTemplateStore: SceneTemplateStore;
  resourceHubStore: ResourceHubStore;
  collectorStore: CollectorStore;
  constructor() {
    this.commonStore = commonStore;
    this.roleStore = roleStore;
    this.permissionStore = permissionStore;
    this.userStore = userStore;
    this.lobbyStore = lobbyStore;
    this.hallStore = hallStore;
    this.assetStore = assetStore;
    this.stageStore = stageStore;
    this.landingStore = landingStore;
    this.boothStore = boothStore;
    this.visitStore = visitStore;
    this.sceneTemplateStore = sceneTemplateStore;
    this.resourceHubStore = resourceHubStore;
    this.collectorStore = collectorStore;
  }
}

export const cmsStores = new CmsStoreModel();
export const CmsStoresContext = createContext<CmsStoreModel>(cmsStores);
