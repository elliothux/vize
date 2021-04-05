import * as React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import { FiCheck } from 'react-icons/fi';
import { Trans } from 'react-i18next';
import { AudioPreview, getResourceURL, ImagePreview, VideoPreview, OtherPreview } from './Preview';
import classNames from 'classnames';

interface Props {
  item: ResourceRecord;
  type: ResourceType;
  selected: boolean;
  toggleSelect: (i: ResourceRecord) => void;
}

function IResourceItem({ item, type, selected, toggleSelect }: Props) {
  const link = useMemo(() => getResourceURL(item, true), [item]);
  const onPreview = useCallback(() => window.open(link, '__blank'), [link]);

  return (
    <div className="resource-item">
      <div className={classNames('resource-item-operations', { selected })} onClick={() => toggleSelect(item)}>
        <FiCheck />
        <span>
          <Trans>{selected ? 'Selected' : 'Select'}</Trans>
        </span>
      </div>
      <Preview item={item} type={type} onPreview={onPreview} />
    </div>
  );
}

export const ResourceItem = memo(IResourceItem);

interface PreviewProps extends Pick<Props, 'item' | 'type'> {
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
