import React, { ReactNode, useState } from 'react';
import MarkdownIt from 'markdown-it';
import Editor, { Plugins, PluginProps } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ChooseResourceModal from '@/components/common/Modals/ChooseResourceModal';
import { IAsset } from '@/interfaces';
import { configConstants } from '@/constants';
import { commonHelpers } from '@/helpers';

const VEMedia = ({ editor }: PluginProps) => {
  const [chooseResourceModal, setChooseResourceModal] = useState<ReactNode>();

  const showChooseResourceModal = () => {
    setChooseResourceModal(
      <ChooseResourceModal
        title={'shared.INSERT_IMAGE'}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    );
  };

  const handleCancel = () => {
    setChooseResourceModal(<></>);
  };

  const handleOk = (item: IAsset) => {
    if (item) {
      const value = `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`;
      if (commonHelpers.isVideo(value)) {
        editor.insertText(
          `<video width="auto" height="auto" autoplay controls><source src="${value}" type="video/mp4" />Your browser does not support the video tag.</video>`
        );
      } else {
        editor.insertMarkdown('image', {
          imageUrl: value,
        });
      }
    }
  };

  return (
    <>
      <span
        className="button button-type-counter"
        title="Counter"
        onClick={showChooseResourceModal}
      >
        <i className="rmel-iconfont rmel-icon-image"></i>
      </span>
      {chooseResourceModal}
    </>
  );
};

VEMedia.align = 'left';
VEMedia.pluginName = 'bhmedia';
Editor.unuse(Plugins.Image);
Editor.use(VEMedia);

interface MarkdownEditorProps {
  value?: string;
  height?: string;
  width?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  height,
  width,
  onChange,
}) => {
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const handleChange = ({ text }: { text: string }) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <Editor
      value={value || ''}
      style={{ height: height, width: width, margin: '10px 0' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleChange}
    />
  );
};

MarkdownEditor.defaultProps = {
  width: '100%',
  height: '300px',
};

export default MarkdownEditor;
