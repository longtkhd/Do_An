import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, List, Avatar, Button } from 'antd';
import { CloudDownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { useMainSiteStores } from '@/hooks';
import { IAsset, IResourceHub } from '@/interfaces';
import { configConstants } from '@/constants';
import { ListItem, ResourceHubWrapper } from './CustomStyled';
import StyledHeading from '@/components/styles/StyledHeading';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Markdown from 'markdown-to-jsx';
import { cloneDeep } from 'lodash';

interface ResourceHubModalProps {
  boothId: number;
}

const ResourceHubModal: React.FC<ResourceHubModalProps> = observer(
  ({ boothId }) => {
    const { resourceHubStore } = useMainSiteStores();
    const [resourceHubs, setResourceHubs] = useState<IResourceHub[]>([]);
    const [
      currentResourceHub,
      setCurrentResourceHub,
    ] = useState<IResourceHub | null>();

    useEffect(() => {
      const fetchData = async () => {
        const resourceHubs = await resourceHubStore.getAllResourceHubs({
          boothId,
        });
        if (resourceHubs && !resourceHubStore.error) {
          setResourceHubs(resourceHubs);
        }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getImageUrl = (item: IAsset) => {
      if (item.value) {
        const isImage = configConstants.imageExt.includes(
          item.value
            .split('.')
            .pop()
            ?.toLowerCase()!
        );
        if ((item as any).type === 'MEDIA') {
          return isImage
            ? `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`
            : require('@/assets/images/mp4-thumb.png');
        }
        return require('@/assets/images/article-thumb.png');
      }
    };

    const handleDownload = async (item: IResourceHub) => {
      setResourceHubLoading(item, true);
      const res = await resourceHubStore.downloadResourceHub(item.id!);
      if (res && !resourceHubStore.error) {
        const fileURL = window.URL.createObjectURL(res);
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', item.asset.value);
        document.body.appendChild(fileLink);
        fileLink.click();
      }
      setResourceHubLoading(item, false);
    };

    const setResourceHubLoading = (item: IResourceHub, loading: boolean) => {
      (item as any).loading = loading;
      setResourceHubs(origin => {
        const resourceHubs = cloneDeep(origin);
        resourceHubs.splice(
          resourceHubs.findIndex(o => o.id === item.id),
          1,
          item
        );
        return resourceHubs;
      });
    };

    return (
      <Modal
        visible={resourceHubStore.visibleResourceHubModal}
        title={'Resource Hub'}
        footer={[
          currentResourceHub ? (
            <Button
              key="close"
              shape="round"
              size="large"
              onClick={() => setCurrentResourceHub(null)}
            >
              Back To List
            </Button>
          ) : (
            <Button
              key="close"
              shape="round"
              size="large"
              onClick={() => resourceHubStore.setVisibleResourceHubModal(false)}
            >
              Close
            </Button>
          ),
        ]}
        width={700}
        onCancel={() => resourceHubStore.setVisibleResourceHubModal(false)}
      >
        {resourceHubStore.isLoading ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <>
            {currentResourceHub ? (
              <ResourceHubWrapper>
                <StyledHeading margin="0px 0px 24px 0px">
                  {currentResourceHub.asset?.name}
                </StyledHeading>
                <Markdown>{currentResourceHub.asset?.value || ''}</Markdown>
              </ResourceHubWrapper>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={resourceHubs}
                renderItem={item => (
                  <ListItem
                    actions={[
                      (item.asset as any).type === 'MEDIA' ? (
                        <Button
                          icon={<CloudDownloadOutlined />}
                          type="primary"
                          shape="round"
                          loading={(item as any).loading}
                          onClick={() => handleDownload(item)}
                        >
                          Download
                        </Button>
                      ) : (
                        <Button
                          icon={<FileTextOutlined />}
                          type="primary"
                          shape="round"
                          onClick={() => setCurrentResourceHub(item)}
                        >
                          View More
                        </Button>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={50}
                          src={getImageUrl(item.asset)}
                        />
                      }
                      title={
                        <StyledHeading fontSize={'16px'}>
                          {item.asset?.name}
                        </StyledHeading>
                      }
                      description={
                        <StyledHeading fontSize={'14px'}>
                          {(item.asset as any).type}
                        </StyledHeading>
                      }
                    />
                  </ListItem>
                )}
              />
            )}
          </>
        )}
      </Modal>
    );
  }
);

export default ResourceHubModal;
