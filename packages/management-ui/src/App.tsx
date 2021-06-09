import 'styles/override.less';
import 'styles/index.scss';
import * as React from 'react';
import { Route, Switch } from 'wouter';
import { LeftBar } from 'components/LeftBar';
import { Login } from 'components/Login';
import { RouterPaths } from 'types';
import { Pages } from 'pages/pages';
import { i18n, initI18N } from 'i18n';
import { Spin } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { useMount } from 'react-use';
import { withDynamicImport } from './components/WithDynamicImport';

export function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  useMount(async () => {
    await init();
    setLoading(false);
  });

  if (loading) {
    return <Spin style={{ width: '100%', marginTop: '40vh' }} spinning tip="loading" size="large" />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Login />
      <LeftBar />

      <div className="vize-main">
        <Switch>
          {/*<Route path={RouterPaths.INTRO} component={withDynamicImport(() => import('./pages/intro'), 'Intro')} />*/}
          <Route path={RouterPaths.PAGES} component={Pages} />
          <Route
            path={RouterPaths.TEMPLATES}
            component={withDynamicImport(() => import('pages/templates'), 'Templates')}
          />
          <Route
            path={RouterPaths.MATERIALS_LIB}
            component={withDynamicImport(() => import('pages/materials'), 'Materials')}
          />
          <Route
            path={RouterPaths.MATERIALS_DETAIL}
            component={withDynamicImport(() => import('pages/materials'), 'MaterialsDetail')}
          />
          <Route path={RouterPaths.BIZ} component={withDynamicImport(() => import('pages/bizs'), 'Bizs')} />
          <Route path={RouterPaths.USER} component={withDynamicImport(() => import('pages/users'), 'Users')} />
          <Route
            path={RouterPaths.RESOURCES}
            component={withDynamicImport(() => import('pages/resources'), 'Resources')}
          />
          <Route path={RouterPaths.LOG} component={withDynamicImport(() => import('pages/logs'), 'Logs')} />
        </Switch>
      </div>
    </I18nextProvider>
  );
}

async function init() {
  await initI18N;
}
