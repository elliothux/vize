import './styles/index.scss';
import * as React from 'react';
import { Route, Switch } from 'wouter';
import { TopBar } from 'components/TopBar';
import { LeftBar } from 'components/LeftBar';
import { RouterPaths } from './router';
import { Intro } from 'pages/intro';
import { Pages } from 'pages/pages';
import { Templates } from 'pages/templates';
import { Management } from 'pages/management';

export function App() {
  return (
    <>
      <TopBar />
      <LeftBar />

      <div className="vize-main">
        <Switch>
          <Route path={RouterPaths.INTRO} component={Intro} />
          <Route path={RouterPaths.PAGES} component={Pages} />
          <Route path={RouterPaths.TEMPLATES} component={Templates} />
          <Route path={RouterPaths.MANAGEMENT} component={Management} />
        </Switch>
      </div>
    </>
  );
}
