import io from 'socket.io-client';
import { configConstants } from '@/constants';

const socketClient = (token: string) => {
  return io.connect(configConstants.API_URL, {
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `${configConstants.TYPE_TOKEN} ${token}`,
        },
      },
    },
  });
};

export default {
  socketClient,
};
