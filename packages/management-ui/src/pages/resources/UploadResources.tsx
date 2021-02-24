import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Modal, PageHeader, Spin, Upload, message, Tag } from 'antd';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { BiArchiveOut } from 'react-icons/bi';
import { FileType } from './types';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  type: FileType;
}

const { Dragger } = Upload;

export function UploadResources({ visible, setVisible, type }: Props) {
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const uploadProps = useMemo(() => {
    return {
      name: 'file',
      withCredentials: true,
      multiple: true,
      action: '/cgi/resource/upload',
      onChange(info: UploadChangeParam) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          return message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          return message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }, [type]);

  return (
    <Modal
      className="upload-resources"
      title=""
      visible={visible}
      onCancel={onBack}
      footer={null}
      closeIcon={<span />}
      destroyOnClose
      closable
    >
      <Spin spinning={loading}>
        <PageHeader onBack={onBack} title="上传资源" subTitle="" />
        <Dragger {...uploadProps}>
          <BiArchiveOut className="upload-drag-icon" />
          <h3>点击或拖动文件到此处上传</h3>
          <div className="upload-hint">
            <p>支持多文件上传，支持格式：</p>
            <ul>
              <li>
                <span>图像: </span>
                <Tag color="orange">jp(e)g</Tag>
                <Tag color="orange">(a)png</Tag>
                <Tag color="orange">gif</Tag>
                <Tag color="orange">webp</Tag>
              </li>
              <li>
                <span>视频(H264): </span>
                <Tag color="orange">mp4</Tag>
                <Tag color="orange">WebM</Tag>等
              </li>
              <li>
                <span>音频(AAC): </span>
                <Tag color="orange">mp3</Tag>等
              </li>
              <li>其他文件，如文本等</li>
            </ul>
          </div>
        </Dragger>
      </Spin>
    </Modal>
  );
}
