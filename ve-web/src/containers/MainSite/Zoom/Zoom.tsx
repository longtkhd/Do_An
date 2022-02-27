import React, { useState, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useHistory, useLocation } from 'react-router';
import { parse } from 'query-string';

const Zoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search);

  const meetingConfig = {
    apiKey: query.apiKey || '',
    meetingNumber: query.meetingId || '',
    leaveUrl: `${window.location.origin}/end-meeting`,
    userName: query.name,
    userEmail: query.email?.toString().trim(),
    passWord: query.meetingPassword || '',
    role: 0,
    signature: query.signature || '',
  };

  useLayoutEffect(() => {
    if (meetingConfig) {
      setTimeout(() => {
        if ((window as any).ZoomMtg) {
          console.log((window as any).ZoomMtg);
          (window as any).ZoomMtg.preLoadWasm();
          (window as any).ZoomMtg.prepareJssdk();
          (window as any).ZoomMtg.init({
            leaveUrl: meetingConfig.leaveUrl,
            isSupportAV: true,
            success: (success: any) => {
              setIsLoading(false);
              const payload = {
                signature: meetingConfig.signature,
                meetingNumber: meetingConfig.meetingNumber,
                userName: meetingConfig.userName,
                apiKey: meetingConfig.apiKey,
                userEmail: meetingConfig.userEmail,
                passWord: meetingConfig.passWord,
                success: (success: any) => {
                  console.log(success);
                },
                error: (error: any) => {
                  console.log(error);
                },
              };
              (window as any).ZoomMtg.join(payload);
            },
            error: (error: any) => {
              setIsLoading(false);
              console.log(error);
              history.push('/end-meeting');
            },
          });
        } else {
          // history.push('/end-meeting');
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? <LoadingSpinner type={'page'} /> : ''}
      <div id="zmmtg-root" style={{ display: 'block' }}>
        <Helmet>
          <link
            type="text/css"
            rel="stylesheet"
            href="https://source.zoom.us/1.8.5/css/bootstrap.css"
          />
          <link
            type="text/css"
            rel="stylesheet"
            href="https://source.zoom.us/1.8.5/css/react-select.css"
          />
          <script src="https://source.zoom.us/zoom-meeting-1.8.5.min.js"></script>
        </Helmet>
      </div>
    </>
  );
};

export default Zoom;
