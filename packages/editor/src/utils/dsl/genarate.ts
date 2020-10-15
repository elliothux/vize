import * as R from 'ramda';
import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  PageDSL,
  PageMode,
  PluginInstance,
  PluginInstanceDSL,
  InstanceKeyType,
} from 'types';
import { componentsStore, globalStore, materialsStore, pagesStore, pluginsStore } from 'states';
import { toJS } from 'mobx';
import { getMaxKey } from '../key';

export function generateDSL(): DSL {
  const {
    mainLib,
    containerName: container,
    layoutMode,
    pageMode,
    globalProps,
    globalStyle,
    metaInfo,
    pageKey,
  } = globalStore;
  const {
    mainMaterialsLib: { entryEntryName },
  } = materialsStore;
  const dsl: DSL = {
    pageKey,
    container: {
      lib: mainLib,
      name: container,
      entry: entryEntryName!,
    },
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
    editInfo: {
      maxKeys: {
        [InstanceKeyType.Page]: getMaxKey(InstanceKeyType.Page),
        [InstanceKeyType.Component]: getMaxKey(InstanceKeyType.Component),
        [InstanceKeyType.HotArea]: getMaxKey(InstanceKeyType.HotArea),
        [InstanceKeyType.Plugin]: getMaxKey(InstanceKeyType.Plugin),
        [InstanceKeyType.Action]: getMaxKey(InstanceKeyType.Action),
        [InstanceKeyType.Action]: getMaxKey(InstanceKeyType.Action),
      },
    },
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
