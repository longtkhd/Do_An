import { makeObservable, observable, action, computed } from 'mobx';
import { landingService } from '@/services/cms';
import i18n from '@/i18n';

export class LandingStore {
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

  async getLanding(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await landingService.getLanding(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateLanding(landingId: number, data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await landingService.updateLanding(landingId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new LandingStore();
