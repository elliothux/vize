import './states';
import * as React from 'react';
import { useMount } from 'react-use';
import { message, Spin } from 'antd';
import { editStore, initStore, materialsStore } from 'states';
import { Header } from 'components/Header';
import { Simulator } from 'components/Simulator';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { HotAreaManager } from 'components/HotAreaManager';
import { I18nextProvider } from 'react-i18next';
import { i18n, initI18N } from 'i18n';
import { getPage } from 'api';
import {
  EventEmitTypes,
  events,
  initMaterialsHotReload,
  isDebugMode,
  parseDSL,
  parseDSLFromCGIRecord,
  restoreState,
} from 'utils';

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
    <I18nextProvider i18n={i18n}>
      <Spin spinning={loading} tip="loading" size="large" wrapperClassName="vize-editor-loading">
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
    </I18nextProvider>
  );
}

async function init() {
  await Promise.all([initStore(), initI18N]);
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
    message.error(i18n.t('failed to get page data'));
    return;
  }

  const dsl = parseDSLFromCGIRecord(result!);
  return restoreState(dsl);
}
