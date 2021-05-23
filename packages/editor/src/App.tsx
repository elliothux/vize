import * as React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { default as useMount } from 'react-use/esm/useMount';
import { message, Spin } from 'antd';
import { editStore, materialsStore } from 'states';
import { I18nextProvider } from 'react-i18next';
import { i18n, useCurrentLanguage } from 'i18n';
import { BiLoaderAlt } from 'react-icons/bi';
import { EventEmitTypes, events, init } from 'libs';
import { Header } from 'components/Header';
import { Simulator } from 'components/Simulator';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { HotAreaManager } from 'components/HotAreaManager';
import { Login } from 'components/Login';
import { ResourceManager } from 'components/ResourceManager';
import { promiseWrapper } from './utils';
import classNames from 'classnames';
import LOGO from 'static/images/logo.svg';

const spinLoading = (
  <>
    <BiLoaderAlt className="icon-loading" />
    <span>loading...</span>
  </>
);

function IApp() {
  const { previewMode } = editStore;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const language = useCurrentLanguage();

  useMount(async () => {
    const [err] = await promiseWrapper(init());
    if (err) {
      setErr(true);
      console.error('Init error:', err);
      return;
    }

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
        tip={(err ? i18n.t('Error occurred') : spinLoading) as any}
        size="large"
        className="vize-editor-loading"
        wrapperClassName="vize-editor-loading-wrap"
        indicator={<img className="loading-logo" src={LOGO} alt="logo" />}
      >
        <Header />
        <main className={classNames(`vize-main language-${language}`, { 'preview-mode': previewMode })}>
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
