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
  HotArea,
  HotAreaDSL,
} from 'types';
import { componentsStore, containerStore, editStore, globalStore, pagesStore, pluginsStore, sharedStore } from 'states';
import { toJS } from 'mobx';
import { getMaxKey } from '../key';

export function generateDSL(): DSL {
  const { mainLib, containerName: container, layoutMode, pageMode, pageKey } = editStore;
  const { globalData, globalStyle, metaInfo } = globalStore;
  const { containerEvents } = containerStore;
  const { sharedComponentInstances } = sharedStore;

  const dsl: DSL = {
    pageKey,
    container: {
      lib: mainLib,
      name: container,
    },
    meta: metaInfo,
    data: globalData,
    style: globalStyle,
    events: [],
    pageInstances: generatePageInstancesDSL(pageMode),
    sharedComponentInstances: sharedComponentInstances.length
      ? generateComponentInstancesDSL(sharedComponentInstances)
      : undefined,
    editInfo: {
      layoutMode,
      pageMode,
      maxKeys: {
        [InstanceKeyType.Page]: getMaxKey(InstanceKeyType.Page),
        [InstanceKeyType.Component]: getMaxKey(InstanceKeyType.Component),
        [InstanceKeyType.HotArea]: getMaxKey(InstanceKeyType.HotArea),
        [InstanceKeyType.Plugin]: getMaxKey(InstanceKeyType.Plugin),
        [InstanceKeyType.Action]: getMaxKey(InstanceKeyType.Action),
      },
    },
  };

  return toJS(dsl, { recurseEverything: true });
}

function generatePageInstancesDSL(pageMode: PageMode): PageDSL[] {
  const { pages } = pagesStore;
  return [];
  // TODO
  // return pages.map(page => {
  //   const pageInstance = R.omit(['isNameEditing'], page);
  //   const componentInstances = componentsStore.getComponentInstancesByPageKey(pageInstance.key);
  //   const pluginInstances = pageMode === PageMode.MULTI ? pluginsStore.getPluginInstances(pageInstance.key) : undefined;
  //   return {
  //     ...pageInstance,
  //     componentInstances: generateComponentInstancesDSL(componentInstances),
  //     pluginInstances: pluginInstances ? generatePluginInstancesDSL(pluginInstances) : undefined,
  //   };
  // });
}

function generateComponentInstancesDSL(componentInstances: ComponentInstance[]): ComponentInstanceDSL[] {
  return componentInstances.map(instance => {
    const componentInstance = R.omit(['parent'], instance);
    return <ComponentInstanceDSL>{
      ...componentInstance,
      children: componentInstance.children ? generateComponentInstancesDSL(componentInstance.children) : undefined,
      hotAreas: componentInstance.hotAreas ? generateHotAreaDSL(componentInstance.hotAreas) : undefined,
    };
  });
}

function generateHotAreaDSL(hotarea: HotArea[]): HotAreaDSL[] {
  return hotarea.map(instance => R.omit(['parent'], instance));
}

function generatePluginInstancesDSL(pluginInstances: PluginInstance[]): PluginInstanceDSL[] {
  return pluginInstances;
}
