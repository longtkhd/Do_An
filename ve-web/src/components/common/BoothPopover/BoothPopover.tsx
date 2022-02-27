import React from 'react';
import { IBooth } from '@/interfaces';
import { PopoverContainer, PopoverArrow } from './CustomStyled';
import { Space, Avatar, Button, Skeleton } from 'antd';
import { commonHelpers } from '@/helpers';
import { configConstants } from '@/constants';
import { useHistory } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';
import Markdown from 'markdown-to-jsx';

interface BoothPopoverProps {
  booth: IBooth;
  hallId: number;
  top: number;
  left: number;
}

const BoothPopover: React.FC<BoothPopoverProps> = ({
  booth,
  hallId,
  top,
  left,
}) => {
  const history = useHistory();

  const visitBooth = () => {
    document.body.style.cursor = 'default';
    history.push(`/hall/${hallId}/booth/${booth.id}`);
  };

  return (
    <PopoverContainer top={top} left={left}>
      <Space align="start">
        <div>
          <Space size={20} direction="vertical">
            <Avatar
              src={
                booth.avatar ? (
                  `${configConstants.ASSETS_URL}/booths/${booth.id}/${booth.avatar}`
                ) : (
                  <Skeleton.Image style={{ width: 110, height: 110 }} />
                )
              }
              size={110}
            />
            <Button onClick={visitBooth} shape="round" size="large">
              VISIT BOOTH
            </Button>
          </Space>
        </div>
        <div>
          <StyledHeading fontWeight="600" fontSize="18px">
            {booth.name}
          </StyledHeading>
          <Markdown>
            {commonHelpers.limitText(booth?.aboutUs ?? '', 230)}
          </Markdown>
        </div>
      </Space>
      <PopoverArrow>
        <span className="ant-popover-arrow-content"></span>
      </PopoverArrow>
    </PopoverContainer>
  );
};

export default BoothPopover;
