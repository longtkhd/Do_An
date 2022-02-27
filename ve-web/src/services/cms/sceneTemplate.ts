import * as requestServices from '@/services/request';

export default {
  getSceneTemplates: (params: any) => {
    return requestServices.clientCms
      .get('/scene-templates', { params })
      .then(res => res.data);
  },
};
