import React from 'react';
import { observer } from 'mobx-react';
import {
  TextWelcomeWrapper,
  TextMesageWrapper,
  TextMesage,
} from './CustomStyled';
import { v4 as uuidv4 } from 'uuid';

interface InputAreaProps {
  fileList: any[];
  sendWelcomeMessage: (message: string) => void;
}

const TextWelcome: React.FC<InputAreaProps> = observer(
  ({ fileList, sendWelcomeMessage }) => {
    const welcomeMessages = [
      `Hi, I'm interested in your services. Can I find out more?${''}`,
      'Hi, can you share with me more about your packages available?',
    ];
    return (
      <TextWelcomeWrapper bottom={fileList.length ? 180 : 150}>
        {welcomeMessages.map(message => (
          <TextMesageWrapper
            onClick={() => sendWelcomeMessage(message)}
            key={uuidv4()}
          >
            <TextMesage>{message}</TextMesage>
          </TextMesageWrapper>
        ))}
      </TextWelcomeWrapper>
    );
  }
);

export default TextWelcome;
