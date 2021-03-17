import './states';
import * as React from 'react';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { message, Spin } from 'antd';
import { editStore, initStore, materialsStore } from 'states';
import { Header } from 'components/Header';
import { Simulator } from 'components/Simulator';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { HotAreaManager } from 'components/HotAreaManager';
import { Login } from 'components/Login';
import { I18nextProvider } from 'react-i18next';
import { i18n, initI18N } from 'i18n';
import { getCurrentUser, getPage } from 'api';
import { BiLoaderAlt } from 'react-icons/bi';
import {
  EventEmitTypes,
  events,
  initMaterialsHotReload,
  isDebugMode,
  parseDSLFromLocalStorage,
  parseDSLFromCGIRecord,
  restoreState,
} from 'utils';
import classNames from 'classnames';
import LOGO from 'static/images/logo.svg';
import { ResourceManager } from './components/ResourceManager';

function IApp() {
  const { previewMode } = editStore;

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
      <Spin
        spinning={loading}
        tip={
          (
            <>
              <BiLoaderAlt className="icon-loading" />
              <span>loading...</span>
            </>
          ) as any
        }
        size="large"
        className="vize-editor-loading"
        wrapperClassName="vize-editor-loading-wrap"
        indicator={<img className="loading-logo" src={LOGO} alt="logo" />}
      >
        <Header />
        <main className={classNames('vize-main', { 'preview-mode': previewMode })}>
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
        <ResourceManager />
      </Spin>
      {loading ? null : <Login />}
    </I18nextProvider>
  );
}

export const App = observer(IApp);

async function init() {
  await Promise.all([initStore(), getCurrentUser(), initI18N]);
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

    const dsl = parseDSLFromLocalStorage(JSON.parse(dslString));
    return restoreState(dsl);
  }

  const [success, result] = await getPage(editStore.pageKey);
  if (!success) {
    console.error(result);
    message.error(i18n.t('failed to get page data'));
    return;
  }

  const [dsl, owner] = parseDSLFromCGIRecord(result!);
  return restoreState(dsl, { owner });
}
