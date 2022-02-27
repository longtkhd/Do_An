import * as requestServices from '@/services/request';

export default {
  getAllResourceHubs: (params: any) => {
    return requestServices.clientMainSite
      .get('/resource-hubs/all', { params })
      .then(res => res.data);
  },
  downloadResourceHub: (id: number) => {
    return requestServices.clientMainSite
      .get(`/resource-hubs/download/${id}`, { responseType: 'blob' })
      .then(res => res);
  },
};
