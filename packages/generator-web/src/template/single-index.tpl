import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as DefaultRouter } from './deps/runtime-web/src/components/Router';
import { sharedComponentInstances, global, meta } from '<%= globalFilePath %>';
import bootstrap from './src';

const pages = <%= pages %>;
const dynamicImports = <%= dynamicImports %>;

let Router = DefaultRouter;

function implementRouterController(CustomRouter: typeof DefaultRouter) {
  Router = CustomRouter;
}

function render() {
  const entry = document.getElementById('vize-main-entry');
  return ReactDOM.render(
    <Router
        pages={pages}
        dynamicImports={dynamicImports}
        sharedComponentInstances={sharedComponentInstances}
        global={global}
        meta={meta}
    />,
    entry
  );
}

bootstrap({ global, meta, render, implementRouterController });
