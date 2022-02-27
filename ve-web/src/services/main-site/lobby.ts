import * as requestServices from '@/services/request';

export default {
  getLobby: (id: number) => {
    return requestServices.clientMainSite
      .get(`/lobbies/${id}`)
      .then(res => res.data);
  },
};
