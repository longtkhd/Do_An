import * as requestServices from '@/services/request';

export default {
  getBooths: (params: any) => {
    return requestServices.clientCms
      .get('/booths', { params })
      .then(res => res.data);
  },
  getBooth: (id: number) => {
    return requestServices.clientCms.get(`/booths/${id}`).then(res => res.data);
  },
  updateBooth: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/booths/${id}`, params)
      .then(res => res.data);
  },
  deleteBooth: (id: number) => {
    return requestServices.clientCms
      .delete(`/booths/${id}`)
      .then(res => res.data);
  },
};
