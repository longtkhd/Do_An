import { makeObservable, observable, action, computed } from 'mobx';
import { stageService } from '@/services/main-site';
import i18n from '@/i18n';

export class StageStore {
  loadingStack: boolean[] = [];
  error: string = '';

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
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

  async checkStageZoomPassword(id: number, password: string) {
    try {
      this.setLoading(true);
      this.setError('');
      return await stageService.checkStageZoomPassword(id, password);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new StageStore();
