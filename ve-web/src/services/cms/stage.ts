import { IStage } from '@/interfaces';
import * as requestServices from '@/services/request';

export default {
  getStages: (params: any) => {
    return requestServices.clientCms
      .get('/stages', { params })
      .then(res => res.data);
  },
  getAllStages: () => {
    return requestServices.clientCms.get('/stages/all').then(res => res.data);
  },
  getStage: (id: number) => {
    return requestServices.clientCms.get(`/stages/${id}`).then(res => res.data);
  },
  updateStage: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/stages/${id}`, params)
      .then(res => res.data);
  },
  createStage: (params: IStage) => {
    return requestServices.clientCms
      .post(`/stages`, params)
      .then(res => res.data);
  },
  deleteStage: (id: number) => {
    return requestServices.clientCms
      .delete(`/stages/${id}`)
      .then(res => res.data);
  },
  deleteStages: (stageIds: number[]) => {
    return requestServices.clientCms
      .delete(`/stages/delete-many`, { data: { stageIds } })
      .then(res => res.data);
  },
  getPermissionsByStage: (id: number) => {
    return requestServices.clientCms
      .get(`/stages/${id}/permissions`)
      .then(res => res.data);
  },
  assignPermissions: (stageId: number, permissionIds: number[]) => {
    return requestServices.clientCms
      .post(`/stages/${stageId}/permissions`, { permissionIds })
      .then(res => res.data);
  },
};
