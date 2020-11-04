import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PageRender } from './src/pages/page-<%= pageKey %>';
import init from './src';

function render() {
  const entry = document.getElementById("<%= entry %>");
  return ReactDOM.render(<PageRender />, entry);
}

init({ render });
