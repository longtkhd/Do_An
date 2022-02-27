import { makeObservable, observable, action, computed } from 'mobx';
import { hallService } from '@/services/cms';
import { IPagination, IHall } from '@/interfaces';
import i18n from '@/i18n';

export class HallStore {
  loadingStack: boolean[] = [];
  error: string = '';
  halls: IHall[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      halls: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getHalls: action,
      setError: action,
      createHall: action,
      deleteHall: action,
      setHalls: action,
      updateHall: action,
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

  setHalls(data: IHall[]) {
    this.halls = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getHalls(params: any = {}) {
    try {
      this.setHalls([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await hallService.getHalls(params);
      this.setHalls(data);
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

  async getAllHalls() {
    try {
      this.setLoading(true);
      this.setError('');
      return await hallService.getAllHalls();
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async createHall(data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await hallService.createHall(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteHall(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await hallService.deleteHall(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getHall(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await hallService.getHall(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateHall(hallId: number, data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await hallService.updateHall(hallId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new HallStore();
