import * as requestServices from '@/services/request';

export default {
  getCollectorSummary: (sceneIdKey: string, sceneId: number) => {
    return requestServices.clientCms
      .get(`/collectors/summary/${sceneIdKey}/${sceneId}`)
      .then(res => res.data);
  },
  getCollectors: (params: any) => {
    return requestServices.clientCms
      .get('/collectors', { params })
      .then(res => res.data);
  },
};
