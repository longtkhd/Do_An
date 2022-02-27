import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { useHistory } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';
import UploadImageCrop from '@/components/common/UploadImageCrop';
import MarkdownEditor from '@/components/common/MarkdownEditor';
import { IBooth } from '@/interfaces';
import { map } from 'lodash';
import { configConstants } from '@/constants';

interface BasicsProps {
  boothId: number;
}

const Basics: React.FC<BasicsProps> = observer(({ boothId }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { boothStore } = useCmsStores();
  const [form] = Form.useForm();
  const [booth, setBooth] = useState<IBooth>();
  const [fileList, setFileList] = useState<any>([]);

  const layout = {
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 12 },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await boothStore.getBooth(boothId);
      if (res && !boothStore.error) {
        const { booth } = res;
        setBooth(booth);
        if (booth.avatar) {
          setFileList([
            {
              url: `${configConstants.ASSETS_URL}/booths/${booth.id}/${booth.avatar}`,
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
      status: booth?.status === 'ACTIVE',
    };
    const fmData = new FormData();
    map(values, (value: string, key) => {
      if (value != null) {
        if (key === 'avatar' && fileList.length && value !== booth?.avatar) {
          const file = fileList[0];
          fmData.append(key, file, file.name);
        } else {
          fmData.append(key, value);
        }
      }
    });
    const res = await boothStore.updateBooth(booth?.id!, fmData);
    if (res && !boothStore.error) {
      message.success(t('booth.UPDATE_BOOTH_SUCCESSFULLY'));
    }
  };

  return (
    <Card title={<StyledHeading>{t('booth.BOOTH_BASICS')}</StyledHeading>}>
      <Form
        layout="vertical"
        {...layout}
        onFinish={save}
        form={form}
        initialValues={{
          ...booth,
        }}
      >
        <Form.Item
          label={t('booth.BOOTH_NAME')}
          name="name"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_INPUT', {
                field: t('booth.BOOTH_NAME').toLowerCase(),
              }),
            },
          ]}
        >
          <Input placeholder={t('booth.BOOTH_NAME')} />
        </Form.Item>
        <Form.Item
          label={t('booth.BOOTH_LOGO')}
          name="avatar"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_UPLOAD', {
                field: t('booth.SITE_LOGO').toLowerCase(),
              }),
            },
          ]}
        >
          <UploadImageCrop
            fileList={fileList}
            onChangeFile={setFileList}
            width={250}
            height={250}
            shape="rect"
          />
        </Form.Item>
        <Form.Item label={t('booth.WEBSITE_URL')} name="websiteUrl">
          <Input placeholder={t('booth.WEBSITE_URL')} />
        </Form.Item>
        <Form.Item label={t('booth.MEETING_ROOM_URL')} name="meetingUrl">
          <Input placeholder={t('booth.MEETING_ROOM_URL')} />
        </Form.Item>
        <Form.Item
          label={t('booth.DESCRIPTION')}
          name="aboutUs"
          wrapperCol={{ span: 24 }}
        >
          <MarkdownEditor />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={boothStore.isLoading}
          >
            {t('shared.SAVE')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default Basics;
