import { action, computed, makeObservable, observable } from 'mobx';
import { organizerService } from '@/services/main-site';
import { ILanding, ILobby, IOrganizer } from '@/interfaces';

export class CommonStore {
  loadingStack: boolean[] = [];
  organizer: IOrganizer | null = null;
  lobby: ILobby | null = null;
  landing: ILanding | null = null;
  visibleLoginModal: boolean = false;
  visibleRegisterModal: boolean = false;
  navCollapsed = false;

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      isLoading: computed,
      setLoading: action,
      organizer: observable,
      lobby: observable,
      navCollapsed: observable,
      landing: observable,
      visibleLoginModal: observable,
      visibleRegisterModal: observable,
    });
  }

  get isLoading() {
    return this.loadingStack.length;
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };

  getOrganizer = async () => {
    try {
      const { organizer } = await organizerService.getOrganizer();
      this.lobby = organizer.lobby;
      this.landing = organizer.landing;
      this.organizer = organizer;
      return organizer;
    } catch (error) {
      console.log(error);
    }
  };

  setVisibleLoginModal(visible: boolean) {
    this.visibleLoginModal = visible;
  }

  setVisibleRegisterModal(visible: boolean) {
    this.visibleRegisterModal = visible;
  }

  toggleCollapsedSideNav = (b: boolean) => {
    this.navCollapsed = b;
  };
}

export default new CommonStore();
