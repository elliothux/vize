import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { initSentryReport } from './utils/report';

function bootstrap() {
  initSentryReport();
  return render(<App />, document.getElementById('root'));
}

bootstrap();
