import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Button, Menu, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { BiUpArrowAlt } from 'react-icons/bi';
import { useTranslation, Trans } from 'react-i18next';
import { ResourceType } from 'types';
import { ResourceList } from './list';
import { UploadResources } from './UploadResources';

type PageState = ResourceType;
const PageState = ResourceType;

export function Resources() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [page, setPage] = useState<PageState>(PageState.IMAGE);

  return (
    <Spin spinning={loading}>
      <Header
        title={t('Resource Management')}
        searchText={t('Search resources')}
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title={t('Upload Resources')} placement="bottom">
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
          <Menu.Item key={PageState.IMAGE}>
            <Trans>Images</Trans>
          </Menu.Item>
          <Menu.Item key={PageState.VIDEO}>
            <Trans>Videos</Trans>
          </Menu.Item>
          <Menu.Item key={PageState.AUDIO}>
            <Trans>Audios</Trans>
          </Menu.Item>
          <Menu.Item key={PageState.OTHER}>
            <Trans>Others</Trans>
          </Menu.Item>
        </Menu>
      </Header>

      <ResourceList setLoading={setLoading} type={page} />

      <UploadResources visible={uploadVisible} setVisible={setUploadVisible} type={page} />
    </Spin>
  );
}
