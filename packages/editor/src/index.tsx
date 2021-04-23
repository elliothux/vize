import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import './styles/index.scss';
import './styles/override.less';

function bootstrap() {
  return render(<App />, document.getElementById('main-entry'));
}

bootstrap();
