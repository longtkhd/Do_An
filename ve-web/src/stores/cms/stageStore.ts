import { makeObservable, observable, action, computed } from 'mobx';
import { stageService } from '@/services/cms';
import { IPagination, IStage } from '@/interfaces';
import i18n from '@/i18n';

export class StageStore {
  loadingStack: boolean[] = [];
  error: string = '';
  stages: IStage[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      stages: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getStages: action,
      setError: action,
      createStage: action,
      deleteStage: action,
      setStages: action,
      updateStage: action,
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

  setStages(data: IStage[]) {
    this.stages = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getStages(params: any = {}) {
    try {
      this.setStages([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await stageService.getStages(params);
      this.setStages(data);
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

  async getAllStages() {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.getAllStages();
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async createStage(data: IStage) {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.createStage(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteStage(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.deleteStage(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getStage(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.getStage(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateStage(stageId: number, data: IStage) {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.updateStage(stageId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new StageStore();
