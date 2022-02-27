import { makeObservable, observable, action, computed } from 'mobx';
import { roleService } from '@/services/cms';
import { IPagination, IRole } from '@/interfaces';
import i18n from '@/i18n';

export class RoleStore {
  loadingStack: boolean[] = [];
  error: string = '';
  roles: IRole[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      roles: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getRoles: action,
      setError: action,
      createRole: action,
      deleteRole: action,
      setRoles: action,
      updateRole: action,
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

  setRoles(data: IRole[]) {
    this.roles = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getRoles(params: any = {}) {
    try {
      this.setRoles([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await roleService.getRoles(params);
      this.setRoles(data);
      this.pagination.current = pagination.page;
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.total = pagination.total;
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async createRole(data: IRole) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.createRole(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteRole(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.deleteRole(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getRole(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.getRole(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateRole(roleId: number, data: IRole) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.updateRole(roleId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getPermissionsByRole(roleId: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.getPermissionsByRole(roleId);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async assignPermissions(roleId: number, permissionIds: number[]) {
    try {
      this.setLoading(true);
      this.setError('');
      return await roleService.assignPermissions(roleId, permissionIds);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new RoleStore();
