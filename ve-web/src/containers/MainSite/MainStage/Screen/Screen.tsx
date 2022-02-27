import React, { useState } from 'react';
import { IStage } from '@/interfaces';
import { ScreenContainer, ZoomContainer, ZoomHeading } from './CustomStyled';
import YouTube from 'react-youtube';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { Form, Button, notification } from 'antd';
import RoundInputPassword from '@/components/styles/RoundInputPassword';

interface ScreenProps {
  collectorType: string;
  collectorName: string;
  stage: IStage;
  type: 'ZOOM' | 'IMAGE' | 'VIDEO' | 'YOUTUBE';
}

interface YoutubeScreenProps {
  youtubeUrl: string;
}

const YoutubeScreen: React.FC<YoutubeScreenProps> = ({ youtubeUrl }) => {
  const opts = {
    height: '100%',
    width: '100%',
  };
  const youtubeParse = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : '';
  };
  const onReady = (event: any) => {
    event.target.pauseVideo();
  };

  return (
    <div className="screen">
      <YouTube
        className="youtube"
        videoId={youtubeParse(youtubeUrl)}
        opts={opts}
        onReady={onReady}
      />
    </div>
  );
};

interface VideoScreenProps {
  src: string;
}

const VideoScreen: React.FC<VideoScreenProps> = ({ src }) => {
  return (
    <video autoPlay controls loop className="screen">
      <source
        src={src || ''}
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2'
      />
    </video>
  );
};

interface ImageScreenProps {
  src: string;
  url: string;
}

const ImageScreen: React.FC<ImageScreenProps> = ({ src, url }) => {
  return (
    <div className="screen">
      <a className="link" href={url}>
        <img className="image" src={src} alt={url}></img>
      </a>
    </div>
  );
};

interface ZoomScreenProps {
  meetingPassword: string;
  stage: IStage;
}

const ZoomScreen: React.FC<ZoomScreenProps> = ({ meetingPassword, stage }) => {
  const { authStore } = useCommonStores();
  const fullName =
    authStore.userInfo?.firstName || authStore.userInfo?.lastName
      ? `${authStore.userInfo?.firstName || ''} ${authStore.userInfo
          ?.lastName || ''}`
      : 'Participant';
  console.log(
    `${window.location.origin}/zoom?name=${fullName}&email=${
      authStore.userInfo?.email
    }&apiKey=${stage.zoomMeeting?.apiKey}&meetingId=${
      stage.zoomMeeting?.meetingId
    }&meetingPassword=${stage.zoomMeeting?.meetingPassword ||
      meetingPassword}&signature=${stage.zoomMeeting?.signature}`
  );
  return (
    <iframe
      title={stage.zoomMeeting?.meetingId}
      className="screen"
      src={`${window.location.origin}/zoom?name=${fullName}&email=${
        authStore.userInfo?.email
      }&apiKey=${stage.zoomMeeting?.apiKey}&meetingId=${
        stage.zoomMeeting?.meetingId
      }&meetingPassword=${stage.zoomMeeting?.meetingPassword ||
        meetingPassword}&signature=${stage.zoomMeeting?.signature}`}
      frameBorder="0"
      sandbox="allow-same-origin allow-scripts allow-forms"
      allow="microphone; camera; fullscreen"
    ></iframe>
  );
};

interface ZoomPasswordFormProps {
  stage: IStage;
  setCorrectPassword: (value: boolean) => void;
  meetingPassword: string;
  setMeetingPassword: (value: string) => void;
}

const ZoomPasswordForm: React.FC<ZoomPasswordFormProps> = ({
  stage,
  setCorrectPassword,
  meetingPassword,
  setMeetingPassword,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { stageStore } = useMainSiteStores();
  const handleCheckPassword = async () => {
    setIsLoading(true);
    const res = await stageStore.checkStageZoomPassword(
      stage.id!,
      meetingPassword
    );
    setIsLoading(false);
    if (res && res.correct) {
      setCorrectPassword(true);
    } else {
      notification.error({
        message: 'Incorrect Zoom meeting password',
      });
      setCorrectPassword(false);
    }
  };

  return (
    <ZoomContainer>
      <ZoomHeading>Enter password to join Zoom meeting</ZoomHeading>
      <Form.Item
        style={{
          width: '100%',
          maxWidth: 400,
        }}
      >
        <RoundInputPassword
          size="large"
          placeholder="Enter password"
          value={meetingPassword}
          onChange={e => setMeetingPassword(e.target.value)}
        />
      </Form.Item>
      <Button
        loading={isLoading}
        type="primary"
        shape="round"
        size="large"
        onClick={handleCheckPassword}
      >
        Submit
      </Button>
    </ZoomContainer>
  );
};

const Screen: React.FC<ScreenProps> = ({
  collectorType,
  collectorName,
  stage,
  type,
}) => {
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);
  const [meetingPassword, setMeetingPassword] = useState<string>('');
  const { authStore, chatStore } = useCommonStores();

  const handleCollector = () => {
    chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
      type: collectorType,
      name: collectorName,
      userId: authStore.userInfo?.id,
      stageId: stage.id,
    });
  };

  const screenByType = () => {
    switch (type) {
      case 'YOUTUBE':
        return <YoutubeScreen youtubeUrl={stage.youtubeUrl || ''} />;
      case 'VIDEO':
        return <VideoScreen src={stage.centreScreen || ''} />;
      case 'IMAGE':
        return (
          <ImageScreen
            src={stage.centreScreen || ''}
            url={stage.centreScreenUrl || ''}
          />
        );
      case 'ZOOM':
        return !correctPassword && stage?.zoomMeeting?.passwordRequired ? (
          <ZoomPasswordForm
            stage={stage}
            setCorrectPassword={setCorrectPassword}
            meetingPassword={meetingPassword}
            setMeetingPassword={setMeetingPassword}
          />
        ) : (
          <ZoomScreen stage={stage} meetingPassword={meetingPassword} />
        );
      default:
        return <></>;
    }
  };

  return (
    <ScreenContainer onClick={() => handleCollector()}>
      <img
        className="screen-placeholer"
        src={require('@/assets/images/screen-placeholder.png')}
        alt="screen-placeholer"
      />
      {screenByType()}
    </ScreenContainer>
  );
};

export default Screen;
