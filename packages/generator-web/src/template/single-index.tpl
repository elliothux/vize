import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as DefaultRouter } from './deps/runtime-web/src/components/Router';
import { ComponentInstances } from './deps/runtime-web/src/components/ComponentInstances';
import { sharedComponentInstances, global, meta } from '<%= globalFilePath %>';
import bootstrap from './src';

const pages = <%= pages %>;
const dynamicImports = <%= dynamicImports %>;

let Router = DefaultRouter;

function implementRouterController(CustomRouter: typeof DefaultRouter) {
  Router = CustomRouter;
}

function SharedComponentInstances({ router }) {
  return (
    <ComponentInstances router={router} meta={meta} global={global} componentInstances={sharedComponentInstances} />
  );
}

function render() {
  const entry = document.getElementById('vize-main-entry');
  return ReactDOM.render(
    <Router
        pages={pages}
        dynamicImports={dynamicImports}
        global={global}
        meta={meta}
        SharedComponentInstances={SharedComponentInstances}
    />,
    entry
  );
}

bootstrap({ global, meta, render, implementRouterController });
