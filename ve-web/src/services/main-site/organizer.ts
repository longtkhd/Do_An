import * as requestServices from '@/services/request';

export default {
  getOrganizer: () => {
    return requestServices.clientMainSite
      .get('/organizers')
      .then(res => res.data);
  },
};
