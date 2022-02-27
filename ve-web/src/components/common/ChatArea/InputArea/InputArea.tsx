import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import {
  SmileOutlined,
  FileImageOutlined,
  PaperClipOutlined,
  VideoCameraOutlined,
  SendOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import EmojiPicker from 'emojione-picker';
import {
  InputAreaWrapper,
  InputTextarea,
  InputIconWrapper,
  IconWrapper,
  IconButton,
  IconButtonSend,
  EmojiWrapper,
  InputFileWrapper,
  FileWrapper,
  FileIconWrapper,
  FileNameSizeWrapper,
  FileName,
  FileSize,
  DeleteIconWrapper,
} from './CustomStyled';
import { IChatMessage } from '@/interfaces';
import TextWelcome from '../TextWelcome';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useCommonStores } from '@/hooks';
import { commonHelpers } from '@/helpers';

interface InputAreaProps {
  messages: IChatMessage[];
  fileList: any[];
  setFileList: (file: any) => void;
  updateSendingMessage: (message: IChatMessage) => void;
  addNewMessage: (message: IChatMessage) => void;
  portal: string;
}

const InputArea: React.FC<InputAreaProps> = observer(
  ({
    fileList,
    messages,
    updateSendingMessage,
    addNewMessage,
    portal,
    setFileList,
  }) => {
    const { authStore, chatStore } = useCommonStores();
    const [visibleEmoji, setVisibleEmoji] = useState<boolean>(false);
    const [uploading, setUploading] = useState(false);
    const [messageType, setMessageType] = useState<string>('MESSAGE');
    const inputRef = useRef<any>(null);

    const addEmoji = (event: any) => {
      if (inputRef.current) {
        inputRef.current.value += event.shortname;
        setVisibleEmoji(false);
      }
    };

    const sendInputMessage = () => {
      const message = inputRef.current.value.trim();
      if (fileList.length || message !== '') {
        sendMessage(message);
      }
    };

    const sendMessage = async (message: string) => {
      let src = null;
      let size = null;
      if (uploading) return;
      if (fileList?.length) {
        setUploading(true);
        inputRef.current.blur();
        const fmData = new FormData();
        const file = fileList[0];
        console.log(file);
        fmData.append('files', file, file.name);
        const res = await chatStore.uploadMessageFiles(fmData);
        if (res?.fileList?.length) {
          src = res?.fileList[0];
          size = file.size;
        }
        setFileList([]);
        setUploading(false);
      }
      if (message !== '' || fileList.length) {
        const tempId = new Date().getTime();
        const payload: any = {
          message,
          tempId: tempId,
          userId: authStore.userInfo?.id,
          chatConversationId: chatStore.currentConversation?.id,
          type: messageType,
          portal,
          src,
          size,
        };
        console.log(payload);
        chatStore.sendEvent('SEND_MESSAGE', payload);
        payload.sending = true;
        payload.id = tempId;
        addNewMessage(payload);
        inputRef.current.value = '';
        setMessageType('MESSAGE');
        inputRef.current.focus();
      }
    };

    const handleKeyPress = (e: any) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendInputMessage();
      }
    };

    const sendWelcomeMessage = (message: string) => {
      sendMessage(message);
    };

    useEffect(() => {
      chatStore.listenEvent('SEND_MESSAGE', (data: any) => {
        updateSendingMessage(data.message);
      });
      return () => {
        chatStore.stopEvent('SEND_MESSAGE');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = (event: any) => {
      setFileList(event.target.files);
      setMessageType(event.target.name.toUpperCase());
      inputRef.current.focus();
    };

    const clearFileList = () => {
      setFileList([]);
      setMessageType('MESSAGE');
      (document.getElementById('upload-file-image') as any).value = '';
      (document.getElementById('upload-file-video') as any).value = '';
      (document.getElementById('upload-file-file') as any).value = '';
    };

    const fileRender = () => {
      if (fileList?.length) {
        const fileExt = fileList[0].name.split('.').pop();
        return (
          <InputFileWrapper>
            <FileWrapper>
              <DeleteIconWrapper onClick={() => clearFileList()}>
                <CloseCircleOutlined />
              </DeleteIconWrapper>
              <FileIconWrapper>
                <FileIcon
                  extension={`.${fileExt}`}
                  {...(defaultStyles as any)[fileExt]}
                />
              </FileIconWrapper>
              <FileNameSizeWrapper>
                <FileName>{fileList[0].name}</FileName>
                <FileSize>
                  {commonHelpers.getFileSize(fileList[0].size)}
                </FileSize>
              </FileNameSizeWrapper>
            </FileWrapper>
          </InputFileWrapper>
        );
      }
    };

    return (
      <InputAreaWrapper height={fileList.length ? 160 : 110}>
        {!messages ||
          (!messages?.length && (
            <TextWelcome
              fileList={fileList}
              sendWelcomeMessage={sendWelcomeMessage}
            />
          ))}
        <input
          name="image"
          id="upload-file-image"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <input
          name="video"
          id="upload-file-video"
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <input
          name="file"
          id="upload-file-file"
          type="file"
          accept="*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {fileRender()}
        <EmojiWrapper visible={visibleEmoji}>
          <EmojiPicker onChange={addEmoji} />
        </EmojiWrapper>
        <InputTextarea
          ref={inputRef}
          placeholder="Type a message..."
          onKeyPress={handleKeyPress}
        />
        <InputIconWrapper>
          <IconWrapper>
            <IconButton onClick={() => setVisibleEmoji(!visibleEmoji)}>
              <SmileOutlined />
            </IconButton>
            <IconButton htmlFor="upload-file-image">
              <FileImageOutlined />
            </IconButton>
            <IconButton htmlFor="upload-file-video">
              <VideoCameraOutlined />
            </IconButton>
            <IconButton htmlFor="upload-file-file">
              <PaperClipOutlined />
            </IconButton>
          </IconWrapper>
          <IconWrapper>
            <IconButtonSend onClick={() => sendInputMessage()}>
              <SendOutlined />
            </IconButtonSend>
          </IconWrapper>
        </InputIconWrapper>
      </InputAreaWrapper>
    );
  }
);

export default InputArea;
