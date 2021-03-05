import './index.scss';
import * as React from 'react';
import { useMemo, useState } from 'react';
import {
  MaterialsRecord,
  Maybe,
  MaterialsComponentManifestItem,
  MaterialsPluginManifestItem,
  MaterialsActionManifestItem,
  MaterialsContainerManifestItem,
} from 'types';
import { useAsyncEffect } from 'hooks';
import { getLibById } from 'api';
import { message, Spin, Menu } from 'antd';
import { RouteComponentProps } from 'wouter';
import { useTranslation, Trans } from 'react-i18next';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { MaterialsDetailInfo } from './MaterialsDetailInfo';
import { ComponentDetailItem } from './ComponentDetailItem';
import { PluginDetailItem } from './PluginDetailItem';
import { ActionDetailItem } from './ActionDetailItem';
import { ContainerDetailItem } from './ContainerDetailItem';

enum PageState {
  INFO = 'info',
  COMPONENTS = 'components',
  PLUGINS = 'plugins',
  ACTIONS = 'actions',
  CONTAINERS = 'containers',
  VERSIONS = 'versions',
}

export function MaterialsDetail({ params: { id } }: RouteComponentProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [lib, setLib] = useState<Maybe<MaterialsRecord>>(null);
  const [page, setPage] = useState<PageState>(PageState.INFO);

  useAsyncEffect(async () => {
    setLoading(true);
    const [success, lib, response] = await getLibById(id);
    if (success) {
      setLib(lib);
      setLoading(false);
    } else {
      message.error(`${t('Failed to get materials library detail')}: ${response.message}`);
    }
  }, [id]);

  const components = useMemo<[string, MaterialsComponentManifestItem][]>(
    () => (lib ? Object.entries(lib.manifest.components) : []),
    [lib],
  );
  const plugins = useMemo<[string, MaterialsPluginManifestItem][]>(
    () => (lib ? Object.entries(lib.manifest.plugins) : []),
    [lib],
  );
  const actions = useMemo<[string, MaterialsActionManifestItem][]>(
    () => (lib ? Object.entries(lib.manifest.actions) : []),
    [lib],
  );
  const contains = useMemo<[string, MaterialsContainerManifestItem][]>(
    () => (lib ? Object.entries(lib.manifest.containers) : []),
    [lib],
  );

  return (
    <Spin spinning={loading} wrapperClassName="materials-detail-loading">
      <Header title={t('Materials Library Detail')} searchText={t('Search materials')} onSearch={console.log}>
        <Menu
          mode="horizontal"
          className="header-menu"
          selectedKeys={[page]}
          onSelect={({ key }) => setPage(key as PageState)}
        >
          <Menu.Item key={PageState.INFO}>
            <Trans>Detail</Trans>
          </Menu.Item>
          <Menu.Item key={PageState.COMPONENTS}>
            <Trans>Components</Trans> ({components.length})
          </Menu.Item>
          <Menu.Item key={PageState.PLUGINS}>
            <Trans>Plugins</Trans> ({plugins.length})
          </Menu.Item>
          <Menu.Item key={PageState.ACTIONS}>
            <Trans>Actions</Trans> ({actions.length})
          </Menu.Item>
          <Menu.Item key={PageState.CONTAINERS}>
            <Trans>Containers</Trans> ({contains.length})
          </Menu.Item>
          <Menu.Item key={PageState.VERSIONS}>
            <Trans>Versions</Trans>
          </Menu.Item>
        </Menu>
      </Header>

      {lib ? (
        <>
          {page === PageState.INFO ? <MaterialsDetailInfo lib={lib} /> : null}

          <div className="materials-item-list content card-items">
            {page === PageState.COMPONENTS
              ? components.map(i => <ComponentDetailItem key={i[0]} item={i} lib={lib} />)
              : null}

            {page === PageState.PLUGINS ? plugins.map(i => <PluginDetailItem key={i[0]} item={i} lib={lib} />) : null}

            {page === PageState.ACTIONS ? actions.map(i => <ActionDetailItem key={i[0]} item={i} lib={lib} />) : null}

            {page === PageState.CONTAINERS
              ? contains.map(i => <ContainerDetailItem key={i[0]} item={i} lib={lib} />)
              : null}

            <FlexPlaceholder />
          </div>
        </>
      ) : null}
    </Spin>
  );
}
