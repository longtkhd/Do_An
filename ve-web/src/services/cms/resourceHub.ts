import * as requestServices from '@/services/request';

export default {
  getAllResourceHubs: (params: any) => {
    return requestServices.clientCms
      .get('/resource-hubs/all', { params })
      .then(res => res.data);
  },
  getResourceHubs: (params: any) => {
    return requestServices.clientCms
      .get('/resource-hubs', { params })
      .then(res => res.data);
  },
  getResourceHub: (id: number) => {
    return requestServices.clientCms
      .get(`/resource-hubs/${id}`)
      .then(res => res.data);
  },
  createResourceHub: (params: FormData) => {
    return requestServices.clientCms
      .post(`/resource-hubs`, params)
      .then(res => res.data);
  },
  deleteResourceHub: (id: number) => {
    return requestServices.clientCms
      .delete(`/resource-hubs/${id}`)
      .then(res => res.data);
  },
  deleteResourceHubs: (resourceHubIds: number[]) => {
    return requestServices.clientCms
      .delete(`/resource-hubs/delete-many`, { data: { resourceHubIds } })
      .then(res => res.data);
  },
};
