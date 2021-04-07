import * as React from "react";
import { AppRender, injectReadonly, injectStyle, setMaterialsMap } from "@vize/runtime-web";
import { meta, globalData } from "global";
<%= imports %>

const page = <%= page %>;

const data = <%= data %>;

const style = <%= style %>;

const componentInstances = <%= componentInstances %>;

const pluginInstances = <%= pluginInstances %>;

const events = <%= events %>;

export function PageRender({ router, sharedComponentInstances }) {
  return (
    <AppRender
      global={global}
      meta={meta}
      componentInstances={componentInstances}
      pluginInstances={pluginInstances}
      router={router}
      sharedComponentInstances={sharedComponentInstances}
    />
  );
}

setMaterialsMap('', {
  components: <%= componentsVars %>,
  plugins: <%= pluginVars %>,
  actions: <%= actionVars %>,
}, false);
