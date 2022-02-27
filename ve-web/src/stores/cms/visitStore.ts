import { makeObservable, observable, action, computed } from 'mobx';
import i18n from '@/i18n';
import { visitService } from '@/services/cms';

export class VisitStore {
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

  async getVisitSummary() {
    try {
      this.setLoading(true);
      this.setError('');
      return await visitService.getVisitSummary();
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getVisitByTime(params: any) {
    try {
      this.setLoading(true);
      this.setError('');
      return await visitService.getVisitByTime(params);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new VisitStore();
