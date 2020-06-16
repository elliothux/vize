import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import { injectReadonly } from 'utils';
// import babelPolyfill from 'babel-polyfill';
// import * as antd from 'antd';

declare global {
    interface Window {
        React: any;
        ReactDom: any;
        // __iframeWindow: Window;
    }
}

export function injectRuntime(target: Window) {
    // const VISION = {};

    // injectReadonlyGetter(VISION, 'global', function() {
    //     return state.getState().globalData;
    // });
    //
    // injectReadonlyGetter(VISION, 'meta', function() {
    //     return generatePageMeta(state.getState());
    // });

    const runtimes: [string, object][] = [
        // ["babelPolyfill", babelPolyfill],
        ['React', React],
        ['ReactDom', ReactDom],
        ['ReactDomServer', ReactDomServer],
    ];

    runtimes.forEach(([key, value]) => injectReadonly(target, key, value));
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