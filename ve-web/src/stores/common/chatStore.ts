import { IChatConversation } from '@/interfaces';
import { chatMessageService } from '@/services/common';
import { makeObservable, observable, action } from 'mobx';
import i18n from '@/i18n';

export class ChatStore {
  loadingStack: boolean[] = [];
  error: string = '';
  socket: SocketIOClient.Socket | null = null;
  conversations: IChatConversation[] = [];
  currentConversation: IChatConversation | null = null;
  visibleInboxModal: boolean = false;

  constructor() {
    makeObservable(this, {
      socket: observable,
      conversations: observable,
      currentConversation: observable,
      visibleInboxModal: observable,
      error: observable,
      setSocket: action,
      sendEvent: action,
      listenEvent: action,
      stopEvent: action,
      setConversations: action,
      setCurrentConversation: action,
      setLoading: action,
      setError: action,
    });
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };

  setError(error: string) {
    this.error = error;
  }

  setSocket(socket: SocketIOClient.Socket) {
    this.socket = socket;
  }

  sendEvent(key: string, payload: any) {
    this.socket?.emit(key, payload);
  }

  listenEvent(key: string, cb: Function) {
    this.socket?.on(key, cb);
  }

  stopEvent(key: string) {
    this.socket?.off(key);
  }

  setConversations(conversations: IChatConversation[]) {
    this.conversations = conversations;
  }

  setCurrentConversation(conversation: IChatConversation | null) {
    this.currentConversation = conversation;
  }

  setVisibleInboxModal(visible: boolean) {
    this.visibleInboxModal = visible;
  }

  async uploadMessageFiles(data: FormData) {
    try {
      this.setLoading(true);
      this.setError('');
      return await chatMessageService.uploadMessageFiles(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new ChatStore();
