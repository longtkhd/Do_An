import * as requestServices from '@/services/request';

export default {
  getBooth: (id: number) => {
    return requestServices.clientMainSite
      .get(`/booths/${id}`)
      .then(res => res.data);
  },
};
