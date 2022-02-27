import * as requestServices from '@/services/request';

export default {
  getLobby: (id: number) => {
    return requestServices.clientCms
      .get(`/lobbies/${id}`)
      .then(res => res.data);
  },
  updateLobby: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/lobbies/${id}`, params)
      .then(res => res.data);
  },
};
