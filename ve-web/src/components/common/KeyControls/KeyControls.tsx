import React, { useRef } from 'react';
import {
  UpOutlined,
  LeftOutlined,
  RedoOutlined,
  RightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  ContainerButtonKey,
  ButtonKey,
  ButtonLeftRightCenter,
} from './CustomStyled';

interface KeyControlsProps {
  hideZoom: string | null;
  hidePan: string | null;
  vectorMove: (direction: string) => void;
}

const KeyControls: React.FC<KeyControlsProps> = ({
  vectorMove,
  hideZoom,
  hidePan,
}) => {
  const controlRef = useRef<HTMLDivElement>(null);
  const btLeftRef = useRef<HTMLDivElement>(null);
  const btRightRef = useRef<HTMLDivElement>(null);
  const zoomInRef = useRef<HTMLDivElement>(null);
  const zoomOutRef = useRef<HTMLDivElement>(null);
  const defaultRef = useRef<HTMLDivElement>(null);

  if (controlRef.current) {
    //button Left
    btLeftRef.current?.addEventListener('mousedown', function(event) {
      vectorMove('left');
      const repeatMove = setInterval(() => {
        vectorMove('left');
      }, 25);
      btLeftRef.current?.addEventListener('mouseleave', function(event) {
        clearInterval(repeatMove);
      });
      btLeftRef.current?.addEventListener('mouseup', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Right
    btRightRef.current?.addEventListener('mousedown', function(event) {
      vectorMove('right');
      const repeatMove = setInterval(() => {
        vectorMove('right');
      }, 25);
      btRightRef.current?.addEventListener('mouseleave', function(event) {
        clearInterval(repeatMove);
      });
      btRightRef.current?.addEventListener('mouseup', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Up
    zoomInRef.current?.addEventListener('mousedown', function(event) {
      vectorMove('in');
      const repeatMove = setInterval(() => {
        vectorMove('in');
      }, 25);
      zoomInRef.current?.addEventListener('mouseleave', function(event) {
        clearInterval(repeatMove);
      });
      zoomInRef.current?.addEventListener('mouseup', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Down
    zoomOutRef.current?.addEventListener('mousedown', function(event) {
      vectorMove('out');
      const repeatMove = setInterval(() => {
        vectorMove('out');
      }, 25);
      zoomOutRef.current?.addEventListener('mouseleave', function(event) {
        clearInterval(repeatMove);
      });
      zoomOutRef.current?.addEventListener('mouseup', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button set default screen
    defaultRef.current?.addEventListener('mousedown', function(event) {
      vectorMove('default');
      const repeatMove = setInterval(() => {
        vectorMove('default');
      }, 25);
      defaultRef.current?.addEventListener('mouseleave', function(event) {
        clearInterval(repeatMove);
      });
      defaultRef.current?.addEventListener('mouseup', function(event) {
        clearInterval(repeatMove);
      });
    });

    //touch
    //button Left
    btLeftRef.current?.addEventListener('touchstart', function(event) {
      vectorMove('left');
      const repeatMove = setInterval(() => {
        vectorMove('left');
      }, 25);
      btLeftRef.current?.addEventListener('touchend', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Right
    btRightRef.current?.addEventListener('touchstart', function(event) {
      vectorMove('right');
      const repeatMove = setInterval(() => {
        vectorMove('right');
      }, 25);
      btRightRef.current?.addEventListener('touchend', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Up
    zoomInRef.current?.addEventListener('touchstart', function(event) {
      vectorMove('in');
      const repeatMove = setInterval(() => {
        vectorMove('in');
      }, 25);
      zoomInRef.current?.addEventListener('touchend', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button Down
    zoomOutRef.current?.addEventListener('touchstart', function(event) {
      vectorMove('out');
      const repeatMove = setInterval(() => {
        vectorMove('out');
      }, 25);
      zoomOutRef.current?.addEventListener('touchend', function(event) {
        clearInterval(repeatMove);
      });
    });

    //button set default screen
    defaultRef.current?.addEventListener('touchstart', function(event) {
      vectorMove('default');
      const repeatMove = setInterval(() => {
        vectorMove('default');
      }, 25);
      defaultRef.current?.addEventListener('touchend', function(event) {
        clearInterval(repeatMove);
      });
    });
  }

  return (
    <div ref={controlRef}>
      <ContainerButtonKey>
        <ButtonKey
          margin="0 auto 8px"
          disabled={!!(hideZoom && hideZoom === 'in')}
          className="disabled"
          ref={zoomInRef}
        >
          <UpOutlined className="key-icon" />
        </ButtonKey>
        <ButtonLeftRightCenter>
          <ButtonKey
            disabled={!!(hidePan && hidePan === 'left')}
            ref={btLeftRef}
          >
            <LeftOutlined className="key-icon" />
          </ButtonKey>
          <ButtonKey margin="0 auto" ref={defaultRef}>
            <RedoOutlined className="key-icon" />
          </ButtonKey>
          <ButtonKey
            disabled={!!(hidePan && hidePan === 'right')}
            ref={btRightRef}
          >
            <RightOutlined className="key-icon" />
          </ButtonKey>
        </ButtonLeftRightCenter>
        <ButtonKey
          margin="8px auto 0"
          disabled={!!(hideZoom && hideZoom === 'out')}
          ref={zoomOutRef}
        >
          <DownOutlined className="key-icon" />
        </ButtonKey>
      </ContainerButtonKey>
    </div>
  );
};

export default KeyControls;
