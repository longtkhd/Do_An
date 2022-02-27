import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import {
  HomeContainer,
  HomeBanner,
  HomeContent,
  ContentWrapper,
  Title,
  Description,
} from './CustomStyled';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { configConstants } from '@/constants';
import { useHistory } from 'react-router-dom';

const Home: React.FC = observer(() => {
  const history = useHistory();
  const { commonStore } = useMainSiteStores();
  const { authStore } = useCommonStores();

  const showLoginModal = () => {
    if (authStore.isLoggedIn) {
      return history.push('/lobby');
    }
    commonStore.setVisibleLoginModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HomeContainer>
        <HomeBanner
          background={`${configConstants.ASSETS_URL}/landings/${commonStore.landing?.id}/${commonStore.landing?.background}`}
        />
        <HomeContent>
          <ContentWrapper>
            <Title>{commonStore.landing?.title}</Title>
            <Description>{commonStore.landing?.description}</Description>
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              shape="round"
              size="large"
              onClick={showLoginModal}
            >
              {commonStore.landing?.button}
            </Button>
          </ContentWrapper>
        </HomeContent>
      </HomeContainer>
    </>
  );
});

export default Home;
