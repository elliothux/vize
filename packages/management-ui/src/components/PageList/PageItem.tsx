import * as React from 'react';
import { LayoutMode, PageMode, PageRecord } from 'types';
import { Card, Tooltip } from 'antd';
import { EditOutlined, CopyOutlined, LineChartOutlined, LinkOutlined, MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import day from 'dayjs';
import { PreviewWithEmpty } from '../PreviewWithEmpty';
import { goToEditor } from './utils';

interface Props {
  item: PageRecord;
  isTemplate: boolean;
}

export function PageItem({
  item,
  item: {
    latestHistory: { title, desc, createdTime: lastModifiedTime },
    createdTime,
    layoutMode,
    pageMode,
    owner,
    key,
  },
  isTemplate,
}: Props) {
  const { t } = useTranslation();
  const created = useMemo(() => day(createdTime).format(`${t('MM-DD')} HH:mm`), [createdTime]);
  const modified = useMemo(() => day(lastModifiedTime).format(`${t('MM-DD')} HH:mm`), [lastModifiedTime]);

  return (
    <Card
      cover={<PreviewWithEmpty src={null} />}
      className="page-item card-item"
      actions={[
        <Tooltip title={t('edit')} key="edit">
          <div onClick={() => goToEditor(item)}>
            <EditOutlined />
          </div>
        </Tooltip>,
        <Tooltip title={t('copy')} key="copy">
          <CopyOutlined />
        </Tooltip>,
        isTemplate ? null : (
          <Tooltip title={t('statistics')} key="data">
            <LineChartOutlined />
          </Tooltip>
        ),
        isTemplate ? null : (
          <Tooltip title={t('copy link')} key="link">
            <LinkOutlined />
          </Tooltip>
        ),
        <MoreOutlined key="more" />,
      ].filter(i => !!i)}
    >
      <Tooltip title={`key: ${key}`} placement="topLeft">
        <h3>{title}</h3>
      </Tooltip>
      <p className="desc">{desc || '...'}</p>

      <div className="times infos">
        <div className="info-item">
          <p>
            <Trans>Created time</Trans>
          </p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Modified time</Trans>
          </p>
          <p>{modified}</p>
        </div>
      </div>

      <div className="infos">
        <div className="info-item">
          <p>
            <Trans>Layout mode</Trans>
          </p>
          <p>
            <Trans>{layoutMode === LayoutMode.FREE ? 'Free' : 'Stream'}</Trans>
          </p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Page mode</Trans>
          </p>
          <p>
            <Trans>{pageMode === PageMode.SINGLE ? 'Single' : 'Multi'}</Trans>
          </p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Creator</Trans>
          </p>
          <p>{owner.name}</p>
        </div>
      </div>
    </Card>
  );
}
