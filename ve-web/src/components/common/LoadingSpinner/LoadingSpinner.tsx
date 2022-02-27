import React from 'react';
import { BlockWrapper, SectionWrapper, Spinner } from './CustomStyled';
import { AppTheme } from '@/interfaces';
import { useCmsStores } from '@/hooks';

interface LoadingSpinnerProps {
  type: 'page' | 'section';
  theme?: AppTheme;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ type, theme }) => {
  const { commonStore } = useCmsStores();
  const blockStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(0)',
  };
  const pageAnimation = () => {
    return (
      <style>
        {`
        @keyframes loading-spinner {
          0% { transform : translate(-50%, -50%) rotate(0); }
          100% { transform : translate(-50%, -50%) rotate(360deg); }
        }
        `}
      </style>
    );
  };
  const sectionAnimation = () => {
    return (
      <style>
        {`
        @keyframes loading-spinner {
          0% { transform : rotate(0); }
          100% { transform : rotate(360deg); }
        }
        `}
      </style>
    );
  };

  return (
    <React.Fragment>
      {type === 'page' ? (
        <BlockWrapper>
          <Spinner theme={theme || commonStore.appTheme} style={blockStyle} />
          {pageAnimation()}
        </BlockWrapper>
      ) : (
        <SectionWrapper>
          <Spinner theme={theme || commonStore.appTheme} />
          {sectionAnimation()}
        </SectionWrapper>
      )}
    </React.Fragment>
  );
};

export default LoadingSpinner;
