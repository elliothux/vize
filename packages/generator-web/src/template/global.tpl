// Import Libs and Runtime
import { injectReadonly, injectStyle, setMaterialsMap } from "@vize/runtime-web";

// Import Components
<%= sharedComponentImports %>

// Import Plugins
<%= pluginImports %>

// Import Actions
<%= actionImports %>

// Init materials map
setMaterialsMap('', {
  components: { <%= sharedComponentVars %> },
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

// Components
export const sharedComponentInstances = <%= sharedComponentInstances %>;

// Plugin
export const pluginInstances = <%= pluginInstances %>;
