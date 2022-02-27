import React from 'react';
import { DownButtonWrapper } from './CustomStyled';
import SVGIcon from '@/components/common/SVGIcon';
import { ReactComponent as DownIcon } from '@/assets/icons/down.svg';

interface DownButtonProps {
  top: string;
  scrollRef: any;
}

const DownButton: React.FC<DownButtonProps> = ({ top, scrollRef }) => {

  const handleScrollDown = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'end'
    })
  }

  return (
    <DownButtonWrapper top={top} onClick={handleScrollDown}>
      <SVGIcon className="down-button-icon" content={<DownIcon />}></SVGIcon>
    </DownButtonWrapper>
  );
};

export default DownButton;
