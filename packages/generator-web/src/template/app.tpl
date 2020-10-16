// Import Libs and Runtime
import * as React from "react";
import { AppRender, injectReadonly, injectStyle } from "<%= runtimePath %>";

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
const actionsMaterialMap = <%= actionsMaterialMap %>;

// Components
const componentsMaterialMap = <%= componentsMaterialMap %> as React.ComponentProps<typeof AppRender>['componentsMaterialMap'];
const componentInstances = <%= componentInstances %> as React.ComponentProps<typeof AppRender>['componentInstances'];

// Plugin
const pluginsMaterialMap = <%= pluginsMaterialMap %> as React.ComponentProps<typeof AppRender>['pluginsMaterialMap'];
const pluginInstances = <%= pluginInstances %> as React.ComponentProps<typeof AppRender>['pluginInstances'] ;

export function App() {
  return (
    <AppRender
      global={global}
      meta={meta}
      actionsMaterialMap={actionsMaterialMap}
      componentsMaterialMap={componentsMaterialMap}
      componentInstances={componentInstances}
      pluginsMaterialMap={pluginsMaterialMap}
      pluginInstances={pluginInstances}
    />
  );
}
