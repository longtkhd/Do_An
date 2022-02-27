import React from 'react';
import { observer } from 'mobx-react';
import {
  MessageReceivedWrapper,
  MessageReceivedContent,
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
import Avatar from 'react-avatar';
import { configConstants } from '@/constants';
import { commonHelpers } from '@/helpers';
import { FileIcon, defaultStyles } from 'react-file-icon';

interface MessageReceivedProps {
  content: string;
  time: string;
  avatar: string;
  type: string;
  src: string;
  size: number;
}

const MessageReceived: React.FC<MessageReceivedProps> = observer(
  ({ content, time, avatar, type, src, size }) => {
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
      <MessageReceivedWrapper>
        <Avatar
          style={{ marginRight: '8px' }}
          name={avatar}
          src={avatar}
          size="40"
          round={true}
        />
        <MessageReceivedContent>
          {renderMessage()}
          <MessageContentTime>{time}</MessageContentTime>
        </MessageReceivedContent>
      </MessageReceivedWrapper>
    );
  }
);

export default MessageReceived;
