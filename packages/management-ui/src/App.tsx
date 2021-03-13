import 'styles/override.less';
import 'styles/index.scss';
import * as React from 'react';
import { Route, Switch } from 'wouter';
import { LeftBar } from 'components/LeftBar';
import { Login } from 'components/Login';
import { RouterPaths } from 'types';
import { Intro } from 'pages/intro';
import { Pages } from 'pages/pages';
import { Templates } from 'pages/templates';
import { Materials, MaterialsDetail } from 'pages/materials';
import { Bizs } from 'pages/bizs';
import { Users } from 'pages/users';
import { Resources } from 'pages/resources';
import { i18n, initI18N } from 'i18n';
import { Spin } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { useMount } from 'react-use';

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
          <Route path={RouterPaths.INTRO} component={Intro} />
          <Route path={RouterPaths.PAGES} component={Pages} />
          <Route path={RouterPaths.TEMPLATES} component={Templates} />
          <Route path={RouterPaths.MATERIALS_LIB} component={Materials} />
          <Route path={RouterPaths.MATERIALS_DETAIL} component={MaterialsDetail} />
          <Route path={RouterPaths.BIZ} component={Bizs} />
          <Route path={RouterPaths.USER} component={Users} />
          <Route path={RouterPaths.RESOURCES} component={Resources} />
        </Switch>
      </div>
    </I18nextProvider>
  );
}

async function init() {
  await initI18N;
}
