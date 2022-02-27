import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import { useHistory } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';
import UploadImageCrop from '@/components/common/UploadImageCrop';
import MarkdownEditor from '@/components/common/MarkdownEditor';
import { ILobby } from '@/interfaces';
import { map } from 'lodash';
import { configConstants } from '@/constants';

const Basics: React.FC = observer(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { lobbyStore } = useCmsStores();
  const { authStore } = useCommonStores();
  const [form] = Form.useForm();
  const [lobby, setLobby] = useState<ILobby>();
  const [fileListLogo, setFileListLogo] = useState<any>([]);
  const [fileListFavicon, setFileListFavicon] = useState<any>([]);

  const layout = {
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 12 },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { lobbyId } = authStore.userInfo!.organizer;
      const res = await lobbyStore.getLobby(lobbyId!);
      if (res && !lobbyStore.error) {
        const { lobby } = res;
        setLobby(lobby);
        if (lobby.logo) {
          setFileListLogo([
            {
              url: `${configConstants.ASSETS_URL}/lobbies/${lobby.id}/${lobby.logo}`,
            },
          ]);
        }
        if (lobby.favicon) {
          setFileListFavicon([
            {
              url: `${configConstants.ASSETS_URL}/lobbies/${lobby.id}/${lobby.favicon}`,
            },
          ]);
        }
        form.resetFields();
      } else {
        history.push('/cms/dashboard');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (values: any) => {
    values = {
      ...values,
      status: lobby?.status === 'ACTIVE',
    };
    const fmData = new FormData();
    map(values, (value: string, key) => {
      if (value != null) {
        if (key === 'logo' && fileListLogo.length && value !== lobby?.logo) {
          const file = fileListLogo[0];
          fmData.append(key, file, file.name);
        } else if (
          key === 'favicon' &&
          fileListFavicon.length &&
          value !== lobby?.favicon
        ) {
          const file = fileListFavicon[0];
          fmData.append(key, file, file.name);
        } else {
          fmData.append(key, value);
        }
      }
    });
    const res = await lobbyStore.updateLobby(lobby?.id!, fmData);
    if (res && !lobbyStore.error) {
      message.success(t('lobby.UPDATE_LOBBY_SUCCESSFULLY'));
    }
  };

  return (
    <Card title={<StyledHeading>{t('lobby.BASICS')}</StyledHeading>}>
      <Form
        layout="vertical"
        {...layout}
        onFinish={save}
        form={form}
        initialValues={{
          ...lobby,
        }}
      >
        <Form.Item
          label={t('lobby.LOBBY_NAME')}
          name="name"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_INPUT', {
                field: t('lobby.LOBBY_NAME').toLowerCase(),
              }),
            },
          ]}
        >
          <Input placeholder={t('lobby.LOBBY_NAME')} />
        </Form.Item>
        <Form.Item
          label={t('lobby.SHOW_WELCOME_MESSAGE')}
          name="isWelcomeMsgVisble"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={t('lobby.SITE_LOGO')}
          name="logo"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_UPLOAD', {
                field: t('lobby.SITE_LOGO').toLowerCase(),
              }),
            },
          ]}
        >
          <UploadImageCrop
            fileList={fileListLogo}
            onChangeFile={setFileListLogo}
            width={150}
            height={50}
            shape="rect"
          />
        </Form.Item>
        <Form.Item label={t('lobby.SITE_TITLE')} name="siteTitle">
          <Input placeholder={t('lobby.SITE_TITLE')} />
        </Form.Item>
        <Form.Item
          label={t('lobby.SITE_FAVICON')}
          name="favicon"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_UPLOAD', {
                field: t('lobby.SITE_FAVICON').toLowerCase(),
              }),
            },
          ]}
        >
          <UploadImageCrop
            fileList={fileListFavicon}
            onChangeFile={setFileListFavicon}
            width={64}
            height={64}
            shape="rect"
          />
        </Form.Item>
        <Form.Item
          label={t('lobby.WELCOME_MESSAGE_TITLE')}
          name="welcomeMsgTitle"
        >
          <Input placeholder={t('lobby.WELCOME_MESSAGE_BUTTON_LEFT')} />
        </Form.Item>
        <Form.Item
          label={t('lobby.WELCOME_MESSAGE_BUTTON_LEFT')}
          name="infoBoothButton"
        >
          <Input placeholder={t('lobby.WELCOME_MESSAGE_BUTTON_LEFT')} />
        </Form.Item>
        <Form.Item
          label={t('lobby.WELCOME_MESSAGE_BUTTON_RIGHT')}
          name="organizerBoothButton"
        >
          <Input placeholder={t('lobby.WELCOME_MESSAGE_BUTTON_RIGHT')} />
        </Form.Item>
        <Form.Item
          label={t('lobby.WELCOME_MESSAGE')}
          name="welcomeMsg"
          wrapperCol={{ span: 24 }}
        >
          <MarkdownEditor />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={lobbyStore.isLoading}
          >
            {t('shared.SAVE')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default Basics;
