import { injectReadonly, injectStyle, setMaterialsMap } from "@vize/runtime-web";
<%= imports %>

export const meta = <%= meta %>;

export const globalData = <%= globalData %>;

export const globalStyle = <%= globalStyle %>;

export const globalEvents = <%= globalEvents %>;

export const sharedComponentInstances = <%= sharedComponentInstances %>;

export const sharedPluginInstances = <%= sharedPluginInstances %>;

injectReadonly('$vize', { meta, globalData, globalStyle });

setMaterialsMap('', {
  components: <%= componentsVars %>,
  plugins: <%= pluginVars %>,
  actions: <%= actionVars %>,
}, false);
