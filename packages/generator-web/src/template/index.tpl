import "regenerator-runtime/runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import init from './src';
import { App } from './src/app';

function render() {
  const entry = document.getElementById("<%= entry %>");
  return ReactDOM.render(<App />, entry);
}

init({ render });
