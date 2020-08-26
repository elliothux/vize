import * as R from 'ramda';
import { ComponentInstance, ComponentInstanceDSL, DSL, PageDSL, PageMode } from '../types';
import { componentsStore, globalStore, pagesStore, pluginsStore } from '../states';
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
    pageInstances: generatePagesDSL(pageMode),
    pluginInstances: pageMode === PageMode.SINGLE ? pluginsStore.getPluginInstancesMap(-1) : undefined,
  };
  return toJS(dsl, { recurseEverything: true });
}

function generatePagesDSL(pageMode: PageMode): PageDSL[] {
  const { pages } = pagesStore;
  return pages.map(page => {
    const pageInstance = R.omit(['isNameEditing'], page);
    const componentInstances = componentsStore.getComponentInstancesMap(pageInstance.key);
    const pluginInstances =
      pageMode === PageMode.MULTI ? pluginsStore.getPluginInstancesMap(pageInstance.key) : undefined;
    return {
      ...pageInstance,
      componentInstances: generateComponentInstancesDSL(componentInstances),
      pluginInstances,
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
