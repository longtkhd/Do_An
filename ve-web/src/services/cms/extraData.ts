import * as requestServices from '@/services/request';

const TYPES = ['roles', 'permissions'];

export default {
  getExtraData: (types: string[]) => {
    if (!types) {
      types = TYPES;
    }
    return requestServices.clientCms
      .get('/extra-data', { params: { type: types.join(',') } })
      .then(res => res.data);
  },
};
