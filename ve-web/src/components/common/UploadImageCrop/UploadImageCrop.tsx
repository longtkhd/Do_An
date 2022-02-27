import React, { useState } from 'react';
import { Upload, Skeleton, Image } from 'antd';
import { UploadWrapper } from './CustomStyled';
import ImgCrop from 'antd-img-crop';

interface UploadImageCropProps {
  fileList: any;
  width: number;
  height: number;
  shape: 'rect' | 'round';
  onChange?: (value: string | null) => void;
  onChangeFile: (fileList: any) => void;
}

const UploadImageCrop: React.FC<UploadImageCropProps> = ({
  fileList,
  onChangeFile,
  onChange,
  width,
  height,
  shape,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const beforeUpload = (file: any) => {
    file.url = URL.createObjectURL(file);
    if (onChange) {
      onChange(file.name);
    }
    onChangeFile([file]);
    return false;
  };

  const handleChange = ({ fileList }: any) => {
    if (onChange) {
      onChange(null);
    }
    onChangeFile(fileList);
  };

  const handlePreview = async (file: any) => {
    setVisible(true);
  };

  const onVisibleChange = (visible: boolean) => {
    if (!visible) {
      setVisible(visible);
    }
  };

  return (
    <UploadWrapper shape={shape}>
      <ImgCrop
        grid
        shape={shape}
        aspect={width / height}
        cropperProps={{
          cropSize: { width, height },
        }}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
        >
          {!fileList.length && <Skeleton.Image />}
        </Upload>
      </ImgCrop>
      {fileList.length ? (
        <Image
          style={{ display: 'none' }}
          src={fileList[0].url}
          preview={{
            visible,
            onVisibleChange,
          }}
        />
      ) : null}
    </UploadWrapper>
  );
};

export default UploadImageCrop;
