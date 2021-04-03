import './styles/index.scss';
import './styles/override.less';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

function bootstrap() {
  return render(<App />, document.getElementById('main-entry'));
}

bootstrap();
