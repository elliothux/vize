import './states';
import * as React from 'react';
import { useMount } from 'react-use';
import { message, Spin } from 'antd';
import { editStore, initStore, materialsStore } from 'states';
import { Simulator } from 'widgets/Simulator';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { Header } from 'components/Header';
import { HotAreaManager } from 'components/HotAreaManager';
import {
  EventEmitTypes,
  events,
  initMaterialsHotReload,
  isDebugMode,
  parseDSL,
  parseDSLFromCGIRecord,
  restoreState,
} from 'utils';
import { getPage } from './api';

export function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  useMount(async () => {
    await init();
    setLoading(false);

    events.only(EventEmitTypes.RELOAD_MATERIALS, async () => {
      setLoading(true);
      await materialsStore.init();

      setTimeout(() => {
        setLoading(false);
        message.destroy();
      }, 1000);
    });
  });

  return (
    <Spin spinning={loading} tip="loading" size="large" wrapperClassName="editor-loading">
      <Header />
      <main className="vize-main">
        <MaterialsView loading={loading} />
        <Simulator>
          {loading ? null : (
            <WithRerender>
              <Renderer />
            </WithRerender>
          )}
        </Simulator>
        <AttributesEditor loading={loading} />
      </main>
      <HotAreaManager />
    </Spin>
  );
}

async function init() {
  await initStore();
  try {
    await restore();
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    const {
      debugPorts: [port],
    } = editStore;

    if (port) {
      initMaterialsHotReload(port);
    }
  }, 1000);

  return;
}

async function restore() {
  if (isDebugMode()) {
    const dslString = localStorage.getItem('dsl');
    if (!dslString) {
      return;
    }

    const dsl = parseDSL(JSON.parse(dslString));
    return restoreState(dsl);
  }

  const [success, result] = await getPage(editStore.pageKey);
  if (!success) {
    console.error(result);
    message.error('获取页面数据失败');
    return;
  }

  const dsl = parseDSLFromCGIRecord(result!);
  return restoreState(dsl);
}
