import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import * as Antd from 'antd';
import * as FormilyCore from '@formily/core';
import * as FormilyReact from '@formily/react';
import * as FormilyAntd from '@formily/antd';
import { injectReadonly } from 'utils';

export function injectRuntime(target: Window) {
  const runtimes = {
    React,
    ReactDom,
    ReactDomServer,
    Antd,
    FormilyCore,
    FormilyReact,
    FormilyAntd,
  };
  Object.entries(runtimes).map(([key, value]) => injectReadonly(target, key, value));
}

const defaultUA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) \
  AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';

export function setUserAgent(win: Window, userAgent: string = defaultUA) {
  if (win.navigator.userAgent !== userAgent) {
    Object.defineProperty(win.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
    });
  }
}
