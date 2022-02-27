import React from 'react';
import { observer } from 'mobx-react';
import {
  MessageSentWrapper,
  MessageSentContent,
  MessageContentWrapper,
  MessageContentText,
  MessageContentTime,
  MessageImage,
  MessageVideo,
  MessageFile,
  FileImage,
  FilenameWrapper,
  Filename,
  Filesize,
} from './CustomStyled';
import { Emojione } from 'react-emoji-render';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { configConstants } from '@/constants';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { commonHelpers } from '@/helpers';

interface MessageSentProps {
  content: string;
  time: string;
  sending: boolean;
  type: string;
  src: string;
  size: number;
}

const MessageSent: React.FC<MessageSentProps> = observer(
  ({ content, time, sending, type, src, size }) => {
    const renderMessage = () => {
      const fileExt = src?.split('.').pop() || '';
      switch (type) {
        case 'MESSAGE':
          return (
            <MessageContentWrapper>
              <MessageContentText>
                <Emojione text={content} />
              </MessageContentText>
            </MessageContentWrapper>
          );
        case 'IMAGE':
          return (
            <MessageContentWrapper>
              <MessageContentText>
                <Emojione text={content} />
                <MessageImage
                  src={`${configConstants.ASSETS_URL}/chatMessages/files/${src}`}
                />
              </MessageContentText>
            </MessageContentWrapper>
          );
        case 'VIDEO':
          return (
            <MessageContentWrapper>
              <MessageContentText>
                <Emojione text={content} />
                <MessageVideo>
                  <source
                    src={`${configConstants.ASSETS_URL}/chatMessages/files/${src}`}
                  />
                </MessageVideo>
              </MessageContentText>
            </MessageContentWrapper>
          );
        case 'FILE':
          return (
            <MessageContentWrapper>
              <MessageContentText>
                <Emojione text={content} />
                <MessageFile>
                  <FileImage>
                    <FileIcon
                      extension={`.${fileExt}`}
                      {...(defaultStyles as any)[fileExt]}
                    />
                  </FileImage>
                  <FilenameWrapper>
                    <Filename>{src}</Filename>
                    <Filesize>
                      {size ? commonHelpers.getFileSize(size) : ''}
                    </Filesize>
                  </FilenameWrapper>
                </MessageFile>
              </MessageContentText>
            </MessageContentWrapper>
          );
      }
    };

    return (
      <MessageSentWrapper>
        <MessageSentContent>
          {renderMessage()}
          {sending ? (
            <Loading3QuartersOutlined spin />
          ) : (
            <MessageContentTime>{time}</MessageContentTime>
          )}
        </MessageSentContent>
      </MessageSentWrapper>
    );
  }
);

export default MessageSent;
