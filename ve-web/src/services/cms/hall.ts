import * as requestServices from '@/services/request';

export default {
  getHalls: (params: any) => {
    return requestServices.clientCms
      .get('/halls', { params })
      .then(res => res.data);
  },
  getAllHalls: () => {
    return requestServices.clientCms.get('/halls/all').then(res => res.data);
  },
  getHall: (id: number) => {
    return requestServices.clientCms.get(`/halls/${id}`).then(res => res.data);
  },
  updateHall: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/halls/${id}`, params)
      .then(res => res.data);
  },
  createHall: (params: FormData) => {
    return requestServices.clientCms
      .post(`/halls`, params)
      .then(res => res.data);
  },
  deleteHall: (id: number) => {
    return requestServices.clientCms
      .delete(`/halls/${id}`)
      .then(res => res.data);
  },
  deleteHalls: (hallIds: number[]) => {
    return requestServices.clientCms
      .delete(`/halls/delete-many`, { data: { hallIds } })
      .then(res => res.data);
  },
};
