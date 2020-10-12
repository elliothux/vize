// Import Libs and Runtime
import * React from 'react';
import { AppRender, injectReadonly, injectStyle } from '@vize/runtime-web';

// Import Components
<%= componentImports %>

// Import Plugins
<%= pluginImports %>

// Import Actions
<%= actionImports %>

// Global Style
injectStyle(`<%= globalStyle %>`, 'vize_injected-global-styles');

// Auto Inject Style
injectStyle(`<%= autoInjectedStyle %>`, 'vize_auto_injected-component-styles');

// Global Data
const meta = <%= meta %>;
const global = <%= global %>;

// Inject Global
injectReadonly('VIZE', { meta, global });

// Actions
const actions = <%= actions %>;

// Components
const components = <%= components %>;
const componentInstances = <%= componentInstances %>;

// Plugin
const plugins = <%= plugins %>;
const pluginInstances = <%= pluginInstances %>;

export function App() {
  return (
    <AppRender
      componentInstances={componentInstances}
      pluginInstances={pluginInstances}
      global={global}
      meta={meta}
    />
  );
}
