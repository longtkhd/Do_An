import * as requestServices from '@/services/request';

export default {
  getStage: (id: number) => {
    return requestServices.clientMainSite
      .get(`/stages/${id}`)
      .then(res => res.data);
  },
  checkStageZoomPassword: (id: number, password: string) => {
    return requestServices.clientMainSite
      .post(`/stages/check-zoom-password/${id}`, { password })
      .then(res => res.data);
  },
};
