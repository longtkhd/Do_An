import { makeObservable, observable, action, computed } from 'mobx';
import { assetService } from '@/services/cms';
import { IPagination, IAsset } from '@/interfaces';
import i18n from '@/i18n';

export class AssetStore {
  loadingStack: boolean[] = [];
  error: string = '';
  assets: IAsset[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };
  uploadedPercent: number = 0;

  constructor() {
    makeObservable(this, {
      assets: observable,
      loadingStack: observable,
      error: observable,
      uploadedPercent: observable,
      isLoading: computed,
      getAssets: action,
      setError: action,
      createAsset: action,
      deleteAsset: action,
      setAssets: action,
      updateAsset: action,
      setUploadedPercent: action,
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

  setAssets(data: IAsset[]) {
    this.assets = data;
  }

  setError(error: string) {
    this.error = error;
  }

  setUploadedPercent(percent: number) {
    this.uploadedPercent = percent;
  }

  async getAssets(params: any = {}) {
    try {
      this.setAssets([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await assetService.getAssets(params);
      this.setAssets(data);
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

  async createAsset(data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await assetService.createAsset(data, event => {
        this.setUploadedPercent(Math.round((event.loaded / event.total) * 100));
      });
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setUploadedPercent(0);
      this.setLoading(false);
    }
  }

  async deleteAsset(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await assetService.deleteAsset(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getAsset(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await assetService.getAsset(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateAsset(assetId: number, data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await assetService.updateAsset(assetId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new AssetStore();
