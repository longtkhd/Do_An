import * as requestServices from '@/services/request';

export default {
  uploadMessageFiles: (params: FormData) => {
    return requestServices.clientCommon
      .post(`/chat-messages/upload`, params)
      .then(res => res.data);
  },
};
