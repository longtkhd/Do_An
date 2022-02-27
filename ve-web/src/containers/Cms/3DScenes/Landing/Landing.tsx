import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import { useHistory } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';
import UploadImageCrop from '@/components/common/UploadImageCrop';
import MarkdownEditor from '@/components/common/MarkdownEditor';
import { ILanding } from '@/interfaces';
import { map } from 'lodash';
import { configConstants } from '@/constants';

const Basics: React.FC = observer(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { landingStore } = useCmsStores();
  const { authStore } = useCommonStores();
  const [form] = Form.useForm();
  const [landing, setLanding] = useState<ILanding>();
  const [fileListBg, setFileListBg] = useState<any>([]);
  const [isAllowLogin, setIsAllowLogin] = useState<boolean>(true);

  const layout = {
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 12 },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { landingId } = authStore.userInfo!.organizer;
      const res = await landingStore.getLanding(landingId!);
      if (res && !landingStore.error) {
        const { landing } = res;
        setLanding(landing);
        if (landing.background) {
          setFileListBg([
            {
              url: `${configConstants.ASSETS_URL}/landings/${landing.id}/${landing.background}`,
            },
          ]);
        }
        setIsAllowLogin(landing.isAllowLogin);
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
      status: landing?.status === 'ACTIVE',
    };
    const fmData = new FormData();
    map(values, (value: string, key) => {
      if (value != null) {
        if (
          key === 'background' &&
          fileListBg.length &&
          value !== landing?.background
        ) {
          const file = fileListBg[0];
          fmData.append(key, file, file.name);
        } else {
          fmData.append(key, value);
        }
      }
    });
    const res = await landingStore.updateLanding(landing?.id!, fmData);
    if (res && !landingStore.error) {
      message.success(t('landing.UPDATE_LANDING_SUCCESSFULLY'));
    }
  };

  return (
    <Card title={<StyledHeading>{t('landing.LANDING_PAGE')}</StyledHeading>}>
      <Form
        layout="vertical"
        {...layout}
        onFinish={save}
        form={form}
        initialValues={{
          ...landing,
        }}
      >
        <Form.Item
          label={t('landing.TITLE')}
          name="title"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_INPUT', {
                field: t('landing.TITLE').toLowerCase(),
              }),
            },
          ]}
        >
          <Input placeholder={t('landing.TITLE')} />
        </Form.Item>
        <Form.Item
          label={t('landing.BACKGROUND')}
          name="background"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_UPLOAD', {
                field: t('landing.BACKGROUND').toLowerCase(),
              }),
            },
          ]}
        >
          <UploadImageCrop
            fileList={fileListBg}
            onChangeFile={setFileListBg}
            width={1920}
            height={1004}
            shape="rect"
          />
        </Form.Item>
        <Form.Item label={t('landing.BUTTON_LABEL')} name="button">
          <Input placeholder={t('landing.BUTTON_LABEL')} />
        </Form.Item>
        <Form.Item
          label={t('landing.ALLOW_LOGIN')}
          name="isAllowLogin"
          valuePropName="checked"
        >
          <Switch onChange={e => setIsAllowLogin(e)} />
        </Form.Item>
        {!isAllowLogin && (
          <Form.Item
            label={t('landing.DISABLE_LOGIN_MESSAGE')}
            name="disableLoginMessage"
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('landing.DISABLE_LOGIN_MESSAGE').toLowerCase(),
                }),
              },
            ]}
          >
            <MarkdownEditor />
          </Form.Item>
        )}
        <Form.Item label={t('landing.DESCRIPTION')} name="description">
          <Input.TextArea
            placeholder={t('landing.DESCRIPTION')}
            autoSize={{ minRows: 8, maxRows: 25 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={landingStore.isLoading}
          >
            {t('shared.SAVE')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default Basics;
