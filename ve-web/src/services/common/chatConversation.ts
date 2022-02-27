import * as requestServices from '@/services/request';

export default {
  getChatConversations: (params: any) => {
    return requestServices.clientCommon
      .get('/chat-conversations', { params })
      .then(res => res.data);
  },
};
