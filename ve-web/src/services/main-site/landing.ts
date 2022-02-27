import * as requestServices from '@/services/request';

export default {
  getLanding: (id: number) => {
    return requestServices.clientMainSite
      .get(`/landings/${id}`)
      .then(res => res.data);
  },
};
