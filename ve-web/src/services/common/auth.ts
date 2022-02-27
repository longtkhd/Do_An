import * as requestServices from '@/services/request';
import { ILogin, IRegister } from '@/interfaces';

export default {
  login: (params: ILogin) => {
    return requestServices.clientCommon
      .post('/auth/login', params)
      .then(res => res.data);
  },
  register: (params: IRegister) => {
    return requestServices.clientCommon
      .post('/auth/register', params)
      .then(res => res.data);
  },
  getUserInfo: () => {
    return requestServices.clientCommon.get('/auth/me').then(res => res.data);
  },
};
