import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from './deps/runtime-web/src/components/Router';
import bootstrap from './src';

const pages = <%= pages %>;
const dynamicImports = <%= dynamicImports %>;

function render() {
  const entry = document.getElementById('vize-main-entry');
  return ReactDOM.render(<Router pages={pages} dynamicImports={dynamicImports} />, entry);
}

bootstrap({ render });
