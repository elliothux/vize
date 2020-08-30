import * as R from 'ramda';
import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  PageDSL,
  PageMode,
  PluginInstance,
  PluginInstanceDSL,
} from 'types';
import { componentsStore, globalStore, pagesStore, pluginsStore } from 'states';
import { toJS } from 'mobx';

export function generateDSL(): DSL {
  const { layoutMode, pageMode, globalProps, globalStyle, metaInfo } = globalStore;
  const dsl: DSL = {
    global: {
      layoutMode,
      pageMode,
      globalProps,
      globalStyle,
      metaInfo,
    },
    pageInstances: generatePageInstancesDSL(pageMode),
    pluginInstances:
      pageMode === PageMode.SINGLE ? generatePluginInstancesDSL(pluginsStore.getPluginInstancesMap(-1)) : undefined,
  };
  return toJS(dsl, { recurseEverything: true });
}

function generatePageInstancesDSL(pageMode: PageMode): PageDSL[] {
  const { pages } = pagesStore;
  return pages.map(page => {
    const pageInstance = R.omit(['isNameEditing'], page);
    const componentInstances = componentsStore.getComponentInstancesMap(pageInstance.key);
    const pluginInstances =
      pageMode === PageMode.MULTI ? pluginsStore.getPluginInstancesMap(pageInstance.key) : undefined;
    return {
      ...pageInstance,
      componentInstances: generateComponentInstancesDSL(componentInstances),
      pluginInstances: generatePluginInstancesDSL(pluginInstances!),
    };
  });
}

function generateComponentInstancesDSL(componentInstances: ComponentInstance[]): ComponentInstanceDSL[] {
  return componentInstances.map(instance => {
    const componentInstance = R.omit(['parent'], instance);
    return <ComponentInstanceDSL>{
      ...componentInstance,
      children: componentInstance.children ? generateComponentInstancesDSL(componentInstance.children) : undefined,
    };
  });
}

function generatePluginInstancesDSL(pluginInstances: PluginInstance[]): PluginInstanceDSL[] {
  return pluginInstances;
}
