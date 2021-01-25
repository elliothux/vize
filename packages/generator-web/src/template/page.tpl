// Import Libs and Runtime
import * as React from "react";
import { AppRender, injectReadonly, injectStyle, setMaterialsMap } from "@vize/runtime-web";
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
