import { makeObservable, observable, action, computed } from 'mobx';
import { userService } from '@/services/cms';
import { IPagination, IUser } from '@/interfaces';
import i18n from '@/i18n';

export class UserStore {
  loadingStack: boolean[] = [];
  error: string = '';
  users: IUser[] = [];
  pagination: IPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '40', '60', '80', '100'],
  };

  constructor() {
    makeObservable(this, {
      users: observable,
      loadingStack: observable,
      error: observable,
      isLoading: computed,
      getUsers: action,
      setError: action,
      createUser: action,
      deleteUser: action,
      setUsers: action,
      updateUser: action,
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

  setUsers(data: IUser[]) {
    this.users = data;
  }

  setError(error: string) {
    this.error = error;
  }

  async getUsers(params: any = {}) {
    try {
      this.setUsers([]);
      this.setLoading(true);
      this.setError('');
      const { data, pagination } = await userService.getUsers(params);
      this.setUsers(data);
      this.pagination.current = pagination.page;
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.total = pagination.total;
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async createUser(data: IUser) {
    try {
      this.setLoading(true);
      this.setError('');
      return await userService.createUser(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async deleteUser(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await userService.deleteUser(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getUser(id: number) {
    try {
      this.setLoading(true);
      this.setError('');
      return await userService.getUser(id);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async getUserSummary() {
    try {
      this.setLoading(true);
      this.setError('');
      return await userService.getUserSummary();
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async updateUser(userId: number, data: IUser) {
    try {
      this.setLoading(true);
      this.setError('');
      return await userService.updateUser(userId, data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new UserStore();
