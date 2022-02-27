import React, { useEffect, useState } from 'react';
import { Modal, List, Avatar, Button } from 'antd';
import { CheckCircleOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { commonHelpers } from '@/helpers';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { ModelType } from '@/interfaces';
import { configConstants } from '@/constants';
import { ListItem } from './CustomStyled';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import StyledHeading from '@/components/styles/StyledHeading';
import theme from '@/styles/theme';

interface SelectModelModalProps {
  title: string;
  okText?: string;
  modelType: string;
  index: number;
  modelId: number;
  listItemIds: number[];
  currentHallId: number;
  onOk: (item: ModelType, index: number) => void;
  onCancel: () => void;
  onRemove: (item: ModelType, index: number) => void;
}

interface FetchDataProps {
  page?: number;
  pageSize?: number | number;
  name?: string;
}

const SelectModelModal: React.FC<SelectModelModalProps> = observer(
  ({
    title,
    okText,
    modelType,
    modelId,
    listItemIds,
    index,
    onOk,
    onCancel,
    onRemove,
  }) => {
    const { t } = useTranslation();
    const { hallStore, stageStore, boothStore } = useCmsStores();
    const [visible, setVisible] = useState<boolean>(true);
    const [selectedModel, setSelectedModel] = useState<ModelType>();
    const [models, setModels] = useState<ModelType[] | undefined>();

    useEffect(() => {
      fetchData({});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async ({
      page = 1,
      pageSize = 10,
      name,
    }: FetchDataProps) => {
      const params = {
        sort: 'id',
        order: 'descend',
        page,
        pageSize,
        name,
      };
      switch (modelType) {
        case configConstants.modelTypes.HALL:
          const halls = await hallStore.getHalls(params);
          setSelectedModel(halls.find((item: any) => item.id === modelId));
          setModels(halls);
          break;
        case configConstants.modelTypes.STAGE:
          const stages = await stageStore.getStages(params);
          setSelectedModel(stages.find((item: any) => item.id === modelId));
          setModels(stages);
          break;
        case configConstants.modelTypes.BOOTH:
          const booths = await boothStore.getBooths(params);
          setSelectedModel(booths.find((item: any) => item.id === modelId));
          setModels(booths);
          break;
        default:
          break;
      }
    };

    const handleOk = async () => {
      onOk(selectedModel!, index);
      handleCancel();
    };

    const handleCancel = () => {
      setVisible(false);
      commonHelpers.delay(300).then(() => onCancel());
    };

    const handleRemove = () => {
      onRemove(selectedModel!, index);
      handleCancel();
    };

    const handleSelect = (item: ModelType) => {
      if (!listItemIds.includes(item.id!)) {
        setSelectedModel(item);
      }
    };

    const isLoading = () => {
      return !!(
        hallStore.isLoading ||
        stageStore.isLoading ||
        boothStore.isLoading
      );
    };

    const getResourceFolder = () => {
      switch (modelType) {
        case configConstants.modelTypes.HALL:
          return 'halls';
        case configConstants.modelTypes.STAGE:
          return 'stages';
        case configConstants.modelTypes.BOOTH:
          return 'booths';
        default:
          break;
      }
    };

    return (
      <Modal
        title={t(title)}
        visible={visible}
        okText={t(okText!)}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        footer={
          <>
            <Button key="back" onClick={handleCancel}>
              {t('shared.CANCEL')}
            </Button>
            <Button type="primary" danger onClick={handleRemove}>
              {t('shared.REMOVE')}
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
              {t('shared.OK')}
            </Button>
          </>
        }
      >
        {isLoading() ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <PerfectScrollbar style={{ height: 400 }}>
            <List
              itemLayout="horizontal"
              dataSource={models}
              renderItem={item => (
                <ListItem
                  onClick={() => handleSelect(item)}
                  selected={
                    item.id === selectedModel?.id ||
                    listItemIds.includes(item.id!)
                  }
                  disabled={listItemIds.includes(item.id!)}
                  actions={[
                    item.id === selectedModel?.id && (
                      <CheckCircleOutlined
                        style={{ color: theme.colors.primaryColor }}
                      />
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={50}
                        src={
                          (item as any).avatar &&
                          `${
                            configConstants.ASSETS_URL
                          }/${getResourceFolder()}/${item.id}/${
                            (item as any).avatar
                          }`
                        }
                        icon={!(item as any).avatar && <CodeSandboxOutlined />}
                      />
                    }
                    title={
                      <StyledHeading fontSize={'16px'}>
                        {item.name}
                      </StyledHeading>
                    }
                    description={
                      <StyledHeading fontSize={'14px'}>
                        Total booth: {15}
                      </StyledHeading>
                    }
                  />
                </ListItem>
              )}
            />
          </PerfectScrollbar>
        )}
      </Modal>
    );
  }
);

SelectModelModal.defaultProps = {
  okText: 'shared.OK',
};

export default SelectModelModal;
