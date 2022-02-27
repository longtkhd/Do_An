import React from 'react';
import { observer } from 'mobx-react';
import { TimeDividerWrapper, TimeDividerContent } from './CustomStyled';
import { Divider } from 'antd';

interface TimeDividerProps {
  time: string;
}

const TimeDivider: React.FC<TimeDividerProps> = observer(({ time }) => {
  return (
    <TimeDividerWrapper>
      <TimeDividerContent>{time}</TimeDividerContent>
      <Divider />
    </TimeDividerWrapper>
  );
});

export default TimeDivider;
