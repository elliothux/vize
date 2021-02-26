import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Button, Menu, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { BiUpArrowAlt } from 'react-icons/bi';
import { UploadResources } from './UploadResources';
import { ResourceType } from 'types';
import { ResourceList } from './list';

type PageState = ResourceType;
const PageState = ResourceType;

export function Resources() {
  const [loading, setLoading] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [page, setPage] = useState<PageState>(PageState.IMAGE);

  return (
    <Spin spinning={loading}>
      <Header
        title="静态资源管理"
        searchText="搜索资源"
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title="上传资源" placement="bottom">
            <Button type="primary" size="large" icon={<BiUpArrowAlt />} onClick={() => setUploadVisible(true)} />
          </Tooltip>
        }
      >
        <Menu
          mode="horizontal"
          className="header-menu"
          selectedKeys={[page]}
          onSelect={({ key }) => setPage(key as PageState)}
        >
          <Menu.Item key={PageState.IMAGE}>图像</Menu.Item>
          <Menu.Item key={PageState.VIDEO}>视频</Menu.Item>
          <Menu.Item key={PageState.AUDIO}>音频</Menu.Item>
          <Menu.Item key={PageState.OTHER}>其他</Menu.Item>
        </Menu>
      </Header>

      <ResourceList setLoading={setLoading} type={page} />

      <UploadResources visible={uploadVisible} setVisible={setUploadVisible} type={page} />
    </Spin>
  );
}
