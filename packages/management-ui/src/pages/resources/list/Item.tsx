import * as React from 'react';
import { ResourceRecord, ResourceType } from 'types';
import { Card, Tooltip, Popconfirm, message } from 'antd';
import { BiLink, BiDownload, BiX, BiShow } from 'react-icons/bi';
import day from 'dayjs';
import { AudioPreview, getResourceURL, ImagePreview, VideoPreview, OtherPreview } from './Preview';
import { useCallback, useMemo } from 'react';
import { copyToClipboardWithMessage, downloadFile } from 'utils';
import { deleteResource } from 'api';
import { useTranslation, Trans } from 'react-i18next';

interface Props {
  item: ResourceRecord;
  type: ResourceType;
  reload: () => Promise<void>;
}

export function ResourceItem({ item, type, reload }: Props) {
  const { t } = useTranslation();
  const created = useMemo(() => day(item.createdTime).format(`${t('YYYY-MM-DD')} HH:mm`), [item]);
  const link = useMemo(() => getResourceURL(item, true), [item]);
  const onPreview = useCallback(() => window.open(link, '__blank'), [link]);
  const onCopy = useCallback(() => copyToClipboardWithMessage(link), [link]);
  const onDownload = useCallback(() => downloadFile(link, item.filename), [link]);
  const onDelete = useCallback(async () => {
    message.loading(t('deleting'));
    const [success, , response] = await deleteResource(item.id);
    message.destroy();

    if (!success) {
      console.error(response);
      return message.error(t('Failed to delete'));
    }

    setTimeout(reload, 0);
    return message.success(t('deleted'));
  }, [link]);

  return (
    <Card
      className={`resource-item card-item ${type}`}
      cover={<Preview item={item} type={type} onPreview={onPreview} />}
      actions={[
        <Tooltip title={t('preview')} key="preview" placement="bottom">
          <BiShow onClick={onPreview} />
        </Tooltip>,
        <Tooltip title={t('copy link')} key="copy" placement="bottom">
          <BiLink onClick={onCopy} />
        </Tooltip>,
        <Tooltip title={t('download')} key="download" placement="bottom">
          <BiDownload onClick={onDownload} />
        </Tooltip>,
        <Tooltip title={t('delete')} key="delete" placement="bottom">
          <Popconfirm title={t('Confirm delete?')} onConfirm={onDelete} okText={t('delete')} cancelText={t('cancel')}>
            <BiX />
          </Popconfirm>
        </Tooltip>,
      ]}
    >
      <div className="infos">
        <div className="info-item">
          <p>
            <Trans>Uploaded time</Trans>
          </p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Type</Trans>
          </p>
          <p>
            {type}/{item.extension}
          </p>
        </div>
      </div>
    </Card>
  );
}

interface PreviewProps extends Omit<Props, 'reload'> {
  onPreview?: () => void;
}

function Preview({ item, type, onPreview }: PreviewProps) {
  switch (type) {
    case ResourceType.IMAGE:
      return <ImagePreview item={item} onPreview={onPreview} />;
    case ResourceType.VIDEO:
      return <VideoPreview item={item} />;
    case ResourceType.AUDIO:
      return <AudioPreview item={item} />;
    default:
      return <OtherPreview item={item} onPreview={onPreview} />;
  }
}
