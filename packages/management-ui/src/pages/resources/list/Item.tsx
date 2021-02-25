import * as React from 'react';
import { ResourceRecord, ResourceType } from 'types';
import { Card, Tooltip, Popconfirm, message } from 'antd';
import { BiLink, BiDownload, BiX, BiShow } from 'react-icons/bi';
import day from 'dayjs';
import { AudioPreview, getResourceURL, ImagePreview, VideoPreview, OtherPreview } from './Preview';
import { useCallback, useMemo } from 'react';
import { copyToClipboardWithMessage, downloadFile } from 'utils';
import { deleteResource } from 'api';

interface Props {
  item: ResourceRecord;
  type: ResourceType;
  reload: () => Promise<void>;
}

export function ResourceItem({ item, type, reload }: Props) {
  const created = useMemo(() => day(item.createdTime).format('YYYY年MM月DD日 HH:mm'), [item]);
  const link = useMemo(() => getResourceURL(item, true), [item]);
  const onPreview = useCallback(() => window.open(link, '__blank'), [link]);
  const onCopy = useCallback(() => copyToClipboardWithMessage(link), [link]);
  const onDownload = useCallback(() => downloadFile(link, item.filename), [link]);
  const onDelete = useCallback(async () => {
    message.loading('移除中');
    const [success, , response] = await deleteResource(item.id);
    message.destroy();

    if (!success) {
      console.error(response);
      return message.error('移除失败');
    }

    setTimeout(reload, 0);
    return message.success('移除成功');
  }, [link]);

  return (
    <Card
      className={`resource-item card-item ${type}`}
      cover={<Preview item={item} type={type} onPreview={onPreview} />}
      actions={[
        <Tooltip title="预览" key="preview" placement="bottom">
          <BiShow onClick={onPreview} />
        </Tooltip>,
        <Tooltip title="复制链接" key="copy" placement="bottom">
          <BiLink onClick={onCopy} />
        </Tooltip>,
        <Tooltip title="下载" key="download" placement="bottom">
          <BiDownload onClick={onDownload} />
        </Tooltip>,
        <Tooltip title="移除" key="delete" placement="bottom">
          <Popconfirm title="确定移除该资源？" onConfirm={onDelete} okText="移除" cancelText="取消">
            <BiX />
          </Popconfirm>
        </Tooltip>,
      ]}
    >
      <div className="infos">
        <div className="info-item">
          <p>上传时间</p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>类型</p>
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
