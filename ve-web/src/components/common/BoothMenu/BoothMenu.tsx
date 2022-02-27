import React from 'react';
import {
  MenuWrapper,
  ItemIconWrapper,
  ItemIcon,
  ItemLabelWrapper,
  AboutUsTitle,
} from './CustomStyled';
import Container from '@/components/styles/Container';
import SVGIcon from '@/components/common/SVGIcon';
import { ReactComponent as WebsiteIcon } from '@/assets/icons/website.svg';
import { ReactComponent as MeetingIcon } from '@/assets/icons/meetingroom.svg';
import { ReactComponent as FolderIcon } from '@/assets/icons/folder.svg';
import { ReactComponent as AppointmentIcon } from '@/assets/icons/appointment.svg';
import { ReactComponent as ChatIcon } from '@/assets/icons/chat.svg';
import { ReactComponent as AboutUsIcon } from '@/assets/icons/aboutus.svg';
import { Row, Col, Divider, Card, Avatar, Skeleton, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { useMediaQuery } from 'react-responsive';
import {
  NavigationMobileButton,
  NavigationMobileContainer,
  NavigationMobileIcon,
  NavigationMobileTitle,
} from '@/components/styles/3DScene';
import Markdown from 'markdown-to-jsx';
import { configConstants } from '@/constants';
import { IBooth } from '@/interfaces';

interface BoothMenuProps {
  booth: IBooth;
  startConversation: () => void;
  scrollRef: any
}

const BoothMenu: React.FC<BoothMenuProps> = ({ booth, startConversation, scrollRef}) => {
  const { resourceHubStore, commonStore } = useMainSiteStores();
  const { chatStore, authStore } = useCommonStores();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });
  const menuStandOptions = [
    {
      label: 'ABOUT US',
      icon: <AboutUsIcon />,
      onClick: () => {
        scrollRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'end'
        })
      },
    },
    {
      label: 'APPOINTMENTS',
      icon: <AppointmentIcon />,
      onClick: () => {
        chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
          type: 'calendlyUrl',
          name: 'Appointment Clicked',
          userId: authStore.userInfo?.id,
          boothId: booth.id,
        });
      },
    },
    {
      label: 'MEETING ROOM',
      icon: <MeetingIcon />,
      onClick: () => {
        if (!booth?.meetingUrl) {
          notification.error({
            message: 'No Meeting Available',
          });
        } else {
          window.open(booth?.meetingUrl, '_blank');
        }
        chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
          type: 'meetingUrl',
          name: 'Meeting Room Clicked',
          userId: authStore.userInfo?.id,
          boothId: booth.id,
        });
      },
    },
    {
      label: 'RESOURCE HUB',
      icon: <FolderIcon />,
      onClick: () => {
        chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
          type: 'resourceHub',
          name: 'Resource Hub Clicked',
          userId: authStore.userInfo?.id,
          boothId: booth.id,
        });
        resourceHubStore.setVisibleResourceHubModal(true);
      },
    },
    {
      label: 'WEBSITE',
      icon: <WebsiteIcon />,
      onClick: () => {
        if (!booth?.websiteUrl) {
          notification.error({
            message: 'No Website Available',
          });
        } else {
          window.open(booth?.websiteUrl, '_blank');
        }
        chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
          type: 'websiteUrl',
          name: 'Online Store Clicked',
          userId: authStore.userInfo?.id,
          boothId: booth.id,
        });
      },
    },
    {
      label: 'LIVE CHAT',
      icon: <ChatIcon />,
      onClick: () => {
        startConversation();
      },
    },
  ];

  const menuInfoOptions = [
    {
      label: 'RESOURCE HUB',
      icon: <FolderIcon />,
      onClick: () => {
        chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
          type: 'resourceHub',
          name: 'Resource Hub Clicked',
          userId: authStore.userInfo?.id,
          boothId: booth.id,
        });
        resourceHubStore.setVisibleResourceHubModal(true);
      },
    },
    {
      label: 'LIVE CHAT',
      icon: <ChatIcon />,
      onClick: () => {
        startConversation();
      },
    },
  ];

  const isInfoDesk = () => {
    return (booth as any)?.type === 'INFORMATION';
  };

  return (
    <>
      {isMobile ? (
        <NavigationMobileContainer>
          {isInfoDesk()
            ? menuInfoOptions.map(option => (
                <NavigationMobileButton
                  onClick={option.onClick}
                  width={`${100 / 2}%`}
                >
                  <NavigationMobileIcon>
                    <SVGIcon
                      width={20}
                      height={20}
                      content={option.icon}
                    ></SVGIcon>
                  </NavigationMobileIcon>
                  <NavigationMobileTitle>{option.label}</NavigationMobileTitle>
                </NavigationMobileButton>
              ))
            : menuStandOptions.map(option => (
                <NavigationMobileButton
                  onClick={option.onClick}
                  width={`${100 / 3}%`}
                >
                  <NavigationMobileIcon>
                    <SVGIcon
                      width={20}
                      height={20}
                      content={option.icon}
                    ></SVGIcon>
                  </NavigationMobileIcon>
                  <NavigationMobileTitle>{option.label}</NavigationMobileTitle>
                </NavigationMobileButton>
              ))}
        </NavigationMobileContainer>
      ) : (
        <MenuWrapper className="3eqweqw12312">
          <Container>
            <Row className={isInfoDesk() ? 'info' : 'stand'}>
              {isInfoDesk()
                ? menuInfoOptions.map((option, index) => (
                    <Col
                      onClick={option.onClick}
                      className="item-wrapper"
                      key={uuidv4()}
                      xs={12}
                    >
                      <ItemIconWrapper>
                        <ItemIcon>
                          <SVGIcon content={option.icon}></SVGIcon>
                        </ItemIcon>
                      </ItemIconWrapper>
                      <ItemLabelWrapper
                        isFirst={index === 0}
                        isLast={index === menuInfoOptions.length - 1}
                      >
                        {option.label}
                      </ItemLabelWrapper>
                    </Col>
                  ))
                : menuStandOptions.map((option, index) => (
                    <Col
                      onClick={option.onClick}
                      className="item-wrapper"
                      key={uuidv4()}
                      xs={4}
                    >
                      <ItemIconWrapper>
                        <ItemIcon>
                          <SVGIcon content={option.icon}></SVGIcon>
                        </ItemIcon>
                      </ItemIconWrapper>
                      <ItemLabelWrapper
                        isFirst={index === 0}
                        isLast={index === menuStandOptions.length - 1}
                      >
                        {option.label}
                      </ItemLabelWrapper>
                    </Col>
                  ))}
            </Row>
          </Container>
        </MenuWrapper>
      )}
      <Container style={{ paddingTop: 24, paddingBottom: 30 }}>
        <Row gutter={[16, 16]}>
          <Col lg={18}>
            <AboutUsTitle>ABOUT US</AboutUsTitle>
            <Divider style={{ margin: '15px 0' }} />
            <Markdown>{booth.aboutUs ? booth.aboutUs : ''}</Markdown>
          </Col>
          <Col lg={6}>
            <Card
              cover={
                <img
                  alt="cover"
                  src={`${configConstants.ASSETS_URL}/landings/${commonStore.landing?.id}/${commonStore.landing?.background}`}
                />
              }
            >
              <Card.Meta
                avatar={
                  <Avatar
                    size={64}
                    src={
                      booth.avatar ? (
                        `${configConstants.ASSETS_URL}/booths/${booth.id}/${booth.avatar}`
                      ) : (
                        <Skeleton.Image style={{ width: 64, height: 64 }} />
                      )
                    }
                  />
                }
                title={booth.name}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BoothMenu;
