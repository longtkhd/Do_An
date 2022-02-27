import * as requestServices from '@/services/request';

export default {
  getUsers: (params: any) => {
    return requestServices.clientCms
      .get('/users', { params })
      .then(res => res.data);
  },
  getUser: (id: number) => {
    return requestServices.clientCms.get(`/users/${id}`).then(res => res.data);
  },
  updateUser: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/users/${id}`, params)
      .then(res => res.data);
  },
  createUser: (params: any) => {
    return requestServices.clientCms
      .post(`/users`, params)
      .then(res => res.data);
  },
  deleteUser: (id: number) => {
    return requestServices.clientCms
      .delete(`/users/${id}`)
      .then(res => res.data);
  },
  getUserSummary: () => {
    return requestServices.clientCms
      .get('/users/summary')
      .then(res => res.data);
  },
};
