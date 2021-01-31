import './index.scss';
import * as React from 'react';
import { useMemo, useState } from 'react';
import {
  MaterialsRecord,
  Maybe,
  MaterialsComponentManifestItem,
  MaterialsPluginManifestItem,
  MaterialsActionManifestItem,
} from 'types';
import { useAsyncEffect } from 'hooks';
import { getLibById } from 'api';
import { message, Spin, Menu } from 'antd';
import { RouteComponentProps } from 'wouter';
import { Header } from 'components/Header';
import day from 'dayjs';
import { MaterialsDetailInfo } from './MaterialsDetailInfo';
import { ComponentDetailItem } from './ComponentDetailItem';
import { PluginDetailItem } from './PluginDetailItem';
import { ActionDetailItem } from './ActionDetailItem';
import { FlexPlaceholder } from '../../../components/FlexPlaceholder';

enum PageState {
  INFO = 'info',
  COMPONENTS = 'components',
  PLUGINS = 'plugins',
  ACTIONS = 'actions',
  VERSIONS = 'versions',
}

export function MaterialsDetail({ params: { id } }: RouteComponentProps) {
  const [loading, setLoading] = useState(true);
  const [lib, setLib] = useState<Maybe<MaterialsRecord>>(null);
  const [page, setPage] = useState(PageState.INFO);

  useAsyncEffect(async () => {
    setLoading(true);
    const [success, lib, response] = await getLibById(id);
    if (success) {
      setLib(lib);
      setLoading(false);
      console.log(lib);
    } else {
      message.error(`获取物料库详情失败：${response.message}`);
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

  return (
    <Spin spinning={loading} wrapperClassName="materials-detail-loading">
      <Header title="物料库详情" searchText="搜索物料..." onSearch={console.log}>
        <Menu
          mode="horizontal"
          className="lib-detail-menu"
          selectedKeys={[page]}
          onSelect={({ key }) => setPage(key as PageState)}
        >
          <Menu.Item key={PageState.INFO}>详情</Menu.Item>
          <Menu.Item key={PageState.COMPONENTS}>组件 ({components.length})</Menu.Item>
          <Menu.Item key={PageState.PLUGINS}>插件 ({plugins.length})</Menu.Item>
          <Menu.Item key={PageState.ACTIONS}>动作 ({actions.length})</Menu.Item>
          <Menu.Item key={PageState.VERSIONS}>版本</Menu.Item>
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

            <FlexPlaceholder />
          </div>
        </>
      ) : null}
    </Spin>
  );
}
