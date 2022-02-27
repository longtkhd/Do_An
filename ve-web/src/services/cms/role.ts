import * as requestServices from '@/services/request';

export default {
  getRoles: (params: any) => {
    return requestServices.clientCms
      .get('/roles', { params })
      .then(res => res.data);
  },
  getRole: (id: number) => {
    return requestServices.clientCms.get(`/roles/${id}`).then(res => res.data);
  },
  updateRole: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/roles/${id}`, params)
      .then(res => res.data);
  },
  createRole: (params: any) => {
    return requestServices.clientCms
      .post(`/roles`, params)
      .then(res => res.data);
  },
  deleteRole: (id: number) => {
    return requestServices.clientCms
      .delete(`/roles/${id}`)
      .then(res => res.data);
  },
  deleteRoles: (roleIds: number[]) => {
    return requestServices.clientCms
      .delete(`/roles/delete-many`, { data: { roleIds } })
      .then(res => res.data);
  },
  getPermissionsByRole: (id: number) => {
    return requestServices.clientCms
      .get(`/roles/${id}/permissions`)
      .then(res => res.data);
  },
  assignPermissions: (roleId: number, permissionIds: number[]) => {
    return requestServices.clientCms
      .post(`/roles/${roleId}/permissions`, { permissionIds })
      .then(res => res.data);
  },
};
