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

export function App() {
  return (
    <>
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
    </>
  );
}
