// Import Libs and Runtime
import * as React from "react";
import { AppRender, injectReadonly, injectStyle, setMaterialsMap } from "../../deps/runtime-web/src";
import { global, meta, pluginInstances } from '<%= globalFilePath %>';

// Import Components
<%= componentImports %>

// Import Actions
<%= actionImports %>

// Init materials map
setMaterialsMap('', {
  components: { <%= componentVars %> },
  actions: { <%= actionVars %> },
} as any, false);

// Components
const componentInstances = <%= componentInstances %> as React.ComponentProps<typeof AppRender>['componentInstances'];

export function PageRender(props) {
  const { router } = props;
  return (
    <AppRender
      global={global}
      meta={meta}
      componentInstances={componentInstances}
      pluginInstances={pluginInstances}
      router={router}
    />
  );
}
