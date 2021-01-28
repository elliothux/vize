import * as React from 'react';
import { LayoutMode, PageMode, PageRecord } from 'types';
import { Card, Tooltip } from 'antd';
import { EditOutlined, CopyOutlined, LineChartOutlined, LinkOutlined, MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import day from 'dayjs';

interface Props {
  item: PageRecord;
}

export function PageItem({
  item: {
    latestHistory: { title, desc, createdTime: lastModifiedTime },
    createdTime,
    layoutMode,
    pageMode,
    author,
    key,
  },
}: Props) {
  const created = useMemo(() => day(createdTime).format('MM月DD日 HH:mm'), [createdTime]);
  const modified = useMemo(() => day(lastModifiedTime).format('MM月DD日 HH:mm'), [lastModifiedTime]);
  const editorPath = useMemo(() => `/editor?key=${key}`, [key]);

  return (
    <Card
      cover={<Cover />}
      className="page-item"
      actions={[
        <Tooltip title="编辑" key="edit">
          <a href={editorPath} target="_blank" rel="noreferrer">
            <EditOutlined key="edit" />
          </a>
        </Tooltip>,
        <Tooltip title="复制" key="copy">
          <CopyOutlined />
        </Tooltip>,
        <Tooltip title="查看数据" key="data">
          <LineChartOutlined />
        </Tooltip>,
        <Tooltip title="复制链接" key="link">
          <LinkOutlined />
        </Tooltip>,
        <MoreOutlined key="more" />,
      ]}
    >
      <h3>{title}</h3>
      <p className="desc">{desc || '...'}</p>

      <div className="times">
        <div className="info-item">
          <p>创建时间</p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>修改时间</p>
          <p>{modified}</p>
        </div>
      </div>

      <div className="infos">
        <div className="info-item">
          <p>布局模式</p>
          <p>{layoutMode === LayoutMode.FREE ? '自由布局' : '流式布局'}</p>
        </div>
        <div className="info-item">
          <p>页面模式</p>
          <p>{pageMode === PageMode.SINGLE ? '单页' : '多页'}</p>
        </div>
        <div className="info-item">
          <p>创建人</p>
          <p>{author}</p>
        </div>
      </div>
    </Card>
  );
}

interface CoverProps {
  cover?: string;
}

export function Cover({ cover }: CoverProps) {
  return <div className="cover">{cover ? <img alt="cover" src={cover} /> : null}</div>;
}
