import * as requestServices from '@/services/request';

export default {
  getVisitSummary: () => {
    return requestServices.clientCms
      .get('/visits/summary')
      .then(res => res.data);
  },
  getVisitByTime: (params: any) => {
    return requestServices.clientCms
      .get('/visits/by-time', { params })
      .then(res => res.data);
  },
};
