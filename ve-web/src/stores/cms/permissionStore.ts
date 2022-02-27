import { makeObservable, observable, action, computed } from 'mobx';
import { permissionService } from '@/services/cms';
import { IPagination, IPermission } from '@/interfaces';
import i18n from '@/i18n';

export class PermissionStore {
  loadingStack: boolean[] = [];
  error: string = '';
  permissions: IPermission[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      permissions: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getPermissions: action,
      setError: action,
      createPermission: action,
      deletePermission: action,
      setPermissions: action,
      updatePermission: action,
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

  setPermissions(data: IPermission[]) {
    this.permissions = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getPermissions(params: any = {}) {
    try {
      this.setPermissions([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await permissionService.getPermissions(
        params
      );
      this.setPermissions(data);
      this.pagination.current = pagination.page;
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.total = pagination.total;
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async createPermission(data: IPermission) {
    try {
      this.setLoading(true);
      this.setError('');
      return await permissionService.createPermission(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deletePermission(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await permissionService.deletePermission(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getPermission(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await permissionService.getPermission(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updatePermission(permissionId: number, data: IPermission) {
    try {
      this.setLoading(true);
      this.setError('');
      return await permissionService.updatePermission(permissionId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new PermissionStore();
