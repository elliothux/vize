import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import init from './src';
import PageRender from './src/pages/page-<%= pageKey %>';

function render() {
  const entry = document.getElementById("<%= entry %>");
  return ReactDOM.render(<PageRender />, entry);
}

init({ render });
