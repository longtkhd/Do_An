import { makeObservable, observable, action, computed } from 'mobx';
import { resourceHubService } from '@/services//main-site';
import i18n from '@/i18n';

export class ResourceHubStore {
  loadingStack: boolean[] = [];
  error: string = '';
  visibleResourceHubModal: boolean = false;

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      visibleResourceHubModal: observable,
      error: observable,
      isLoading: computed,
      setError: action,
    });
  }

  get isLoading() {
    return !!this.loadingStack.length;
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };

  setError(error: string) {
    this.error = error;
  }

  setVisibleResourceHubModal(visible: boolean) {
    this.visibleResourceHubModal = visible;
  }

  async getAllResourceHubs(params: any = {}) {
    try {
      this.setLoading(true);
      this.setError('');
      return await resourceHubService.getAllResourceHubs(params);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async downloadResourceHub(id: number) {
    try {
      this.setError('');
      return await resourceHubService.downloadResourceHub(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    }
  }
}

export default new ResourceHubStore();
