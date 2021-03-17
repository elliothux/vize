import * as React from 'react';
import { memo, useMemo } from 'react';
import { message, Tag, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { BiArchiveOut } from 'react-icons/bi';
import { ResourceType } from 'sharedTypes';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  type: ResourceType;
}

const { Dragger } = Upload;

function IUploadResources({ type }: Props) {
  const { t } = useTranslation();

  const uploadProps = useMemo(() => {
    return {
      name: 'file',
      withCredentials: true,
      multiple: true,
      action: '/cgi/resource/upload',
      onChange(info: UploadChangeParam) {
        const { status, name } = info.file;
        if (status === 'done') {
          message.destroy();
          return message.success(`"${name}" ${t('uploaded successfully')}`);
        } else if (status === 'error') {
          message.destroy();
          return message.error(`"${name}" ${t('failed to upload')}`);
        }
      },
    };
  }, [type]);

  return (
    <Dragger className="upload-resources" {...uploadProps}>
      <h3>
        <BiArchiveOut className="upload-drag-icon" />
        <Trans>Click or drag files here to upload</Trans>
      </h3>
      <div className="upload-hint">
        <p>
          <Trans>Support multiple files. Supported formats</Trans>:
        </p>

        {type === ResourceType.IMAGE && (
          <>
            <Tag color="orange">jp(e)g</Tag>
            <Tag color="orange">(a)png</Tag>
            <Tag color="orange">gif</Tag>
            <Tag color="orange">webp</Tag>
            <Trans>...</Trans>
          </>
        )}

        {type === ResourceType.VIDEO && (
          <>
            <Tag color="orange">mp4</Tag>
            <Tag color="orange">m4v</Tag>
            <Trans>...</Trans>
          </>
        )}

        {type === ResourceType.AUDIO && (
          <>
            <Tag color="orange">mp3</Tag>
            <Tag color="orange">ogg</Tag>
            <Trans>...</Trans>
          </>
        )}

        {type === ResourceType.OTHER && (
          <>
            <Trans>Like text etc.</Trans>
          </>
        )}
      </div>
    </Dragger>
  );
}

export const UploadResources = memo(IUploadResources);
