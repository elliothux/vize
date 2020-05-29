import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { initDocument } from './utils';
import './states';
import './styles/index.scss';

initDocument(document, () => render(<App />, document.getElementById('main-entry')));
