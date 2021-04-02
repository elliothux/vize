import './styles/index.scss';
import './styles/override.less';
import * as React from 'react';
import { render } from 'react-dom';
import { initDocument } from 'libs';
import { App } from './App';

initDocument(document, () => render(<App />, document.getElementById('main-entry')));
