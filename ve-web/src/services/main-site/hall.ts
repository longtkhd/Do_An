import * as requestServices from '@/services/request';

export default {
  getHall: (id: number) => {
    return requestServices.clientMainSite
      .get(`/halls/${id}`)
      .then(res => res.data);
  },
};
