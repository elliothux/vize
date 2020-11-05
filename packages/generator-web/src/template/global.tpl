// Import Libs and Runtime
import { injectReadonly, injectStyle, setMaterialsMap } from "../../deps/runtime-web/src";

// Import Plugins
<%= pluginImports %>

// Import Actions
<%= actionImports %>

// Init materials map
setMaterialsMap('', {
  plugins: { <%= pluginVars %> },
  actions: { <%= actionVars %> },
} as any, false);

// Global Style
injectStyle(`<%= globalStyle %>`, 'vize_injected-global-styles');

// Auto Inject Style
injectStyle(`<%= autoInjectedStyle %>`, 'vize_auto_injected-component-styles');

// Global Data
export const meta = <%= meta %>;
export const global = <%= global %>;

// Inject Global
injectReadonly('VIZE', { meta, global });

// Plugin
export const pluginInstances = <%= pluginInstances %>;
