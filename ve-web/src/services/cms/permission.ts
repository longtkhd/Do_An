import * as requestServices from '@/services/request';

export default {
  getPermissions: (params: any) => {
    return requestServices.clientCms
      .get('/permissions', { params })
      .then(res => res.data);
  },
  getPermission: (id: number) => {
    return requestServices.clientCms
      .get(`/permissions/${id}`)
      .then(res => res.data);
  },
  updatePermission: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/permissions/${id}`, params)
      .then(res => res.data);
  },
  createPermission: (params: any) => {
    return requestServices.clientCms
      .post(`/permissions`, params)
      .then(res => res.data);
  },
  deletePermission: (id: number) => {
    return requestServices.clientCms
      .delete(`/permissions/${id}`)
      .then(res => res.data);
  },
};
