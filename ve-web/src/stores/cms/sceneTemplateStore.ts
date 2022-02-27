import { makeObservable, observable, action, computed } from 'mobx';
import { sceneTemplateService } from '@/services/cms';
import i18n from '@/i18n';

export class SceneTemplateStore {
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

  async getSceneTemplates(params: any = {}) {
    try {
      this.setLoading(true);
      this.setError('');
      return await sceneTemplateService.getSceneTemplates(params);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new SceneTemplateStore();
