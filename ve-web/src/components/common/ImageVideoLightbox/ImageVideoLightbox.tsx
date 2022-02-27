import React, { useEffect, useState } from 'react';
import utils from './utils';
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SETTLE_RANGE = 0.001;
const ADDITIONAL_LIMIT = 0.2;
const DOUBLE_TAP_THRESHOLD = 300;
const ANIMATION_SPEED = 0.04;
const RESET_ANIMATION_SPEED = 0.08;
const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_SCALE = 1;
const MOBILE_ICON_SIZE = 35;
const DESKTOP_ICON_SIZE = 50;

const KEYS = {
  ESC: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

const ImageVideoLightbox: React.FC<any> = ({
  startIndex,
  onNavigationCallback,
  data,
  showResourceCount,
  onCloseCallback,
}) => {
  const [x, setX] = useState(INITIAL_X);
  const [y, setY] = useState(INITIAL_Y);
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [index, setIndex] = useState(startIndex);
  const [swiping, setSwiping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iconSize, setIconSize] = useState(
    window.innerWidth <= 500 ? MOBILE_ICON_SIZE : DESKTOP_ICON_SIZE
  );
  const [resources, setResources] = useState<any>([]);
  let animation: any;
  let lastTouchEnd: any;
  let swipeStartX: any;
  let swipeStartY: any;
  let lastDistance: any;

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    getResources();
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 500) {
        setIconSize(MOBILE_ICON_SIZE);
      } else {
        setIconSize(DESKTOP_ICON_SIZE);
      }
    });
    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth <= 500) {
          setIconSize(MOBILE_ICON_SIZE);
        } else {
          setIconSize(DESKTOP_ICON_SIZE);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const zoomTo = (s: any) => {
    const frame = () => {
      if (scale === s) return null;

      const distance = s - scale;
      const targetScale = scale + ANIMATION_SPEED * distance;

      zoom(utils.settle(targetScale, scale, SETTLE_RANGE));
      animation = requestAnimationFrame(frame);
    };

    animation = requestAnimationFrame(frame);
  };

  const reset = () => {
    const frame = () => {
      if (scale === INITIAL_SCALE && x === INITIAL_X && y === INITIAL_Y)
        return null;

      const scaleDelta = INITIAL_SCALE - scale;
      const targetScale = utils.settle(
        scale + RESET_ANIMATION_SPEED * scaleDelta,
        INITIAL_SCALE,
        SETTLE_RANGE
      );

      const nextWidth = width * targetScale;
      const nextHeight = height * targetScale;

      setScale(targetScale);
      setWidth(nextWidth);
      setHeight(nextHeight);
      setX(INITIAL_X);
      setY(INITIAL_Y);

      animation = requestAnimationFrame(frame);
    };

    animation = requestAnimationFrame(frame);
  };

  const handleTouchStart = (event: any) => {
    animation && cancelAnimationFrame(animation);
    if (event.touches.length === 2) handlePinchStart(event);
    if (event.touches.length === 1) handleTapStart(event);
  };

  const handleTouchMove = (event: any) => {
    if (event.touches.length === 2) handlePinchMove(event);
    if (event.touches.length === 1) handlePanMove(event);
  };

  const handleTouchEnd = (event: any) => {
    if (event.touches.length > 0) return null;

    if (scale > MAX_SCALE) return zoomTo(MAX_SCALE);
    if (scale < MIN_SCALE) return zoomTo(MIN_SCALE);

    if (lastTouchEnd && lastTouchEnd + DOUBLE_TAP_THRESHOLD > event.timeStamp) {
      reset();
    }

    if (swiping && scale === 1) {
      handleSwipe(event);
    }

    lastTouchEnd = event.timeStamp;
  };

  const handleSwipe = (event: any) => {
    var swipeDelta = event.changedTouches[0].clientX - swipeStartX;
    if (swipeDelta < -(width / 3)) {
      swipeRight();
    } else if (swipeDelta > width / 3) {
      swipeLeft();
    } else {
      reset();
    }
  };

  const swipeLeft = () => {
    var currentIndex = index;
    if (currentIndex > 0) {
      setTimeout(() => {
        setIndex(currentIndex - 1);
        setSwiping(false);
        setX(INITIAL_X);
        setLoading(true);
        onNavigationCallback(currentIndex - 1);
      }, 500);
    } else {
      reset();
    }
  };

  const swipeRight = () => {
    var currentIndex = index;
    if (currentIndex < data.length - 1) {
      setTimeout(() => {
        setIndex(currentIndex + 1);
        setSwiping(false);
        setX(INITIAL_X);
        setLoading(true);
        onNavigationCallback(currentIndex + 1);
      }, 500);
    } else {
      reset();
    }
  };

  const handleTapStart = (event: any) => {
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
    if (scale === 1) {
      setSwiping(true);
    }
  };

  const handlePanMove = (event: any) => {
    if (scale === 1) {
      setX(event.touches[0].clientX - swipeStartX);
    } else {
      event.preventDefault();
      setX(event.touches[0].clientX - swipeStartX);
      setY(event.touches[0].clientY - swipeStartY);
    }
  };

  const handlePinchStart = (event: any) => {
    const pointA = utils.getPointFromTouch(event.touches[0]);
    const pointB = utils.getPointFromTouch(event.touches[1]);
    lastDistance = utils.getDistanceBetweenPoints(pointA, pointB);
  };

  const handlePinchMove = (event: any) => {
    event.preventDefault();
    const pointA = utils.getPointFromTouch(event.touches[0]);
    const pointB = utils.getPointFromTouch(event.touches[1]);
    const distance = utils.getDistanceBetweenPoints(pointA, pointB);
    const s = utils.between(
      MIN_SCALE - ADDITIONAL_LIMIT,
      MAX_SCALE + ADDITIONAL_LIMIT,
      scale * (distance / lastDistance)
    );
    zoom(s);
    lastDistance = distance;
  };

  const zoom = (scale: any) => {
    const nextWidth = width * scale;
    const nextHeight = height * scale;
    setWidth(nextWidth);
    setHeight(nextHeight);
    setScale(scale);
  };

  const handleKeyInput = (event: any) => {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      // ESC key closes the lightbox
      case KEYS.ESC:
        event.preventDefault();
        onCloseCallback();
        break;

      // Left arrow key moves to previous image
      case KEYS.LEFT_ARROW:
        break;

      // Right arrow key moves to next image
      case KEYS.RIGHT_ARROW:
        break;

      default:
    }
  };

  const getResources = () => {
    var items = [];
    for (var i = 0; i < data.length; i++) {
      var resource = data[i];
      if (resource.type === 'photo') {
        items.push(
          <img
            key={i}
            alt={resource.altTag}
            src={resource.url}
            style={{
              pointerEvents: scale === 1 ? 'auto' : 'none',
              maxWidth: '100%',
              maxHeight: '100%',
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              transition: 'transform 0.5s ease-out',
            }}
            onLoad={() => {
              setLoading(false);
            }}
          />
        );
      }

      if (resource.type === 'video') {
        items.push(
          <iframe
            key={i}
            width="560"
            height="315"
            src={resource.url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title={resource.title}
            // alt={resource.altTag}
            allowFullScreen
            style={{
              pointerEvents: scale === 1 ? 'auto' : 'none',
              maxWidth: '100%',
              maxHeight: '100%',
              transform: `translate(${x}px, ${y}px)`,
              transition: 'transform 0.5s ease-out',
            }}
            onLoad={() => {
              setLoading(false);
            }}
          ></iframe>
        );
      }
    }

    setResources(items);
  };

  const closeIfClickInner = (event: any) => {
    if (event.target.className.search(/\bril-inner\b/) > -1) {
      onCloseCallback();
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyInput}
      onKeyUp={handleKeyInput}
      style={{
        top: '0px',
        left: '0px',
        overflow: 'hidden',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.45)',
        zIndex: 1001,
      }}
    >
      {showResourceCount && (
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            padding: '15px',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          <span>{index + 1}</span> / <span>{data.length}</span>
        </div>
      )}
      <div className="ant-image-preview-operations">
        <ul className="ant-image-preview-operations">
          <li className="ant-image-preview-operations-operation">
            <CloseOutlined style={{ fontSize: 18 }} onClick={onCloseCallback} />
          </li>
        </ul>
      </div>

      {index + 1 !== 1 ? (
        <LeftOutlined
          style={{
            position: 'absolute',
            left: '0px',
            zIndex: 1,
            color: '#FFFFFF',
            cursor: 'pointer',
            fontSize: `${iconSize}px`,
          }}
          onClick={() => {
            swipeLeft();
          }}
        />
      ) : (
        <></>
      )}
      {index + 1 !== data.length ? (
        <RightOutlined
          style={{
            position: 'absolute',
            right: '0px',
            zIndex: 1,
            color: '#FFFFFF',
            cursor: 'pointer',
            fontSize: `${iconSize}px`,
          }}
          onClick={() => {
            swipeRight();
          }}
        />
      ) : (
        <></>
      )}
      {loading && (
        <LoadingOutlined
          style={{
            position: 'absolute',
            color: '#FFFFFF',
          }}
        />
      )}
      <div
        style={{
          transition: 'translate3d(0px, 0px, 0px)',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          textAlign: 'center',
        }}
        className="ril-inner ril__inner"
        onClick={closeIfClickInner}
      >
        {resources[index]}
      </div>
    </div>
  );
};

export default ImageVideoLightbox;
