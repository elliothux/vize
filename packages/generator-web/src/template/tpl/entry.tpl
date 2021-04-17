import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  implementRouterController,
  getCurrentPageInstance,
  getRouter,
  RenderEntry,
  RenderEntryProps,
} from '@vize/runtime-web/src/components/RenderEntry';
import { onCustomEvent, cancelCustomEvent, emitCustomEvent } from '@vize/runtime-web/src/libs/customEvents';
import { meta, globalData, globalStyle, globalEvents, sharedComponentInstances, sharedPluginInstances } from 'global';
import init from 'container';
<%= imports %>

const pages = <%= pages %>;

const pageImports = <%= pageImports %>;

const renderParams: RenderEntryProps = {
  meta,
  globalData,
  globalStyle,
  globalEvents,
  sharedComponentInstances,
  sharedPluginInstances,
  pages,
  pageImports,
};

function render() {
  const entry = document.querySelector('#vize-main-entry');
  return ReactDOM.render(React.createElement(RenderEntry, renderParams), entry);
}

init({
  render,
  implementRouterController,
  on: (eventName: string, callback: Function) => {
    return onCustomEvent('global', eventName, callback);
  },
  cancel: (eventName: string, callback: Function) => {
    return cancelCustomEvent('global', eventName, callback);
  },
  emit: (eventName: string) => {
    const { data: pageData, style: pageStyle } = getCurrentPageInstance()!;
    const router = getRouter()!;
    return emitCustomEvent({
      events: globalEvents,
      eventName,
      router,
      meta,
      globalData,
      globalStyle,
      pageData,
      pageStyle,
    });
  },
});
