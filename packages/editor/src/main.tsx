import 'reflect-metadata';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { isDev, initSentryReport } from './utils';
import './styles/index.scss';
import './styles/override.less';

function bootstrap() {
  if (!isDev()) {
    initSentryReport();
  }
  return render(<App />, document.getElementById('main-entry'));
}

bootstrap();
