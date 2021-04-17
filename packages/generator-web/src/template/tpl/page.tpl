import * as React from "react";
import { AppRender, injectReadonly, injectStyle, setMaterialsMap, transformComponentDSL2Instance } from "@vize/runtime-web";
import { meta, globalData } from "global";
<%= imports %>

const pageInfo = <%= pageInfo %>;

const data = <%= data %>;

const style = <%= style %>;

const componentInstances = <%= componentInstances %>;

const pluginInstances = <%= pluginInstances %>;

const events = <%= events %>;

export const pageInstance = {
    ...pageInfo,
    data,
    style,
    events,
    componentInstances: transformComponentDSL2Instance(componentInstances),
    pluginInstances,
};

setMaterialsMap('', {
  components: <%= componentsVars %>,
  plugins: <%= pluginVars %>,
  actions: <%= actionVars %>,
}, false);
