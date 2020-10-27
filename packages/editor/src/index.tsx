import './styles/index.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { initDocument } from './utils';

initDocument(document, () => render(<App />, document.getElementById('main-entry')));
