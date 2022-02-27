import * as requestServices from '@/services/request';

export default {
  getLanding: (id: number) => {
    return requestServices.clientCms
      .get(`/landings/${id}`)
      .then(res => res.data);
  },
  updateLanding: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/landings/${id}`, params)
      .then(res => res.data);
  },
};
