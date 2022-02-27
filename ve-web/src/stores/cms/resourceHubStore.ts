import { makeObservable, observable, action, computed } from 'mobx';
import { resourceHubService } from '@/services/cms';
import { IPagination, IResourceHub } from '@/interfaces';
import i18n from '@/i18n';

export class ResourceHubStore {
  loadingStack: boolean[] = [];
  error: string = '';
  resourceHubs: IResourceHub[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      resourceHubs: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getResourceHubs: action,
      setError: action,
      createResourceHub: action,
      deleteResourceHub: action,
      setResourceHubs: action,
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

  setResourceHubs(data: IResourceHub[]) {
    this.resourceHubs = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getResourceHubs(params: any = {}) {
    try {
      this.setResourceHubs([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await resourceHubService.getResourceHubs(
        params
      );
      this.setResourceHubs(data);
      this.pagination.current = pagination.page;
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.total = pagination.total;
      return data;
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
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

  async createResourceHub(data: any) {
    try {
      this.setLoading(true);
      this.setError('');
      return await resourceHubService.createResourceHub(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteResourceHub(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await resourceHubService.deleteResourceHub(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getResourceHub(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await resourceHubService.getResourceHub(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new ResourceHubStore();
