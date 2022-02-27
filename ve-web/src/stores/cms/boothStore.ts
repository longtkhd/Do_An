import { makeObservable, observable, action, computed } from 'mobx';
import { boothService } from '@/services/cms';
import i18n from '@/i18n';
import { IBooth, IPagination } from '@/interfaces';

export class BoothStore {
  loadingStack: boolean[] = [];
  error: string = '';
  booths: IBooth[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      error: observable,
      pagination: observable,
      booths: observable,
      isLoading: computed,
      setError: action,
      getBooths: action,
      getBooth: action,
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

  setBooths(data: IBooth[]) {
    this.booths = data;
  }

  async getBooth(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await boothService.getBooth(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getBooths(params: any = {}) {
    try {
      this.setBooths([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await boothService.getBooths(params);
      this.setBooths(data);
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

  async updateBooth(boothId: number, data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await boothService.updateBooth(boothId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteBooth(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await boothService.deleteBooth(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new BoothStore();
