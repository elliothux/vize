import * as React from 'react';
import * as ReactDOM from 'react-dom';
import init from './src';
import { App } from './src/app';

function render() {
  return ReactDOM.render(<App />, document.getElementById("<%= entry %>"));
}

init({ render });
