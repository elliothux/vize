// Import Libs and Runtime
import * as React from "react";
import { AppRender, injectReadonly, injectStyle, setMaterialsMap } from "../deps/runtime-web/src";

// Import Components
<%= componentImports %>

// Import Plugins
<%= pluginImports %>

// Import Actions
<%= actionImports %>

// Init materials map
setMaterialsMap('', {
  components: { <%= componentVars %> },
  plugins: { <%= pluginVars %> },
  actions: { <%= actionVars %> },
} as any);

// Global Style
injectStyle(`<%= globalStyle %>`, 'vize_injected-global-styles');

// Auto Inject Style
injectStyle(`<%= autoInjectedStyle %>`, 'vize_auto_injected-component-styles');

// Global Data
const meta = <%= meta %>;
const global = <%= global %>;

// Inject Global
injectReadonly('VIZE', { meta, global });

// Components
const componentInstances = <%= componentInstances %> as React.ComponentProps<typeof AppRender>['componentInstances'];

// Plugin
const pluginInstances = <%= pluginInstances %> as React.ComponentProps<typeof AppRender>['pluginInstances'] ;

export function App() {
  return (
    <AppRender
      global={global}
      meta={meta}
      componentInstances={componentInstances}
      pluginInstances={pluginInstances}
    />
  );
}
