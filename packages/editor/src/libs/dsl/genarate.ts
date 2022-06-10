import * as R from 'ramda';
import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  PluginInstance,
  PluginInstanceDSL,
  InstanceKeyType,
  HotArea,
  HotAreaDSL,
  PageInstanceDSL,
} from '@vize/types';
import { editStore, globalStore, pagesStore, sharedStore } from 'states';
import { toJS } from 'mobx';
import { getMaxKey } from '../key';

export function generateDSL(): DSL {
  const { mainLib, containerName: container, pageKey } = editStore;
  const { globalData, globalStyle, globalEvents, metaInfo } = globalStore;
  const { sharedComponentInstances } = sharedStore;

  const dsl: DSL = {
    pageKey,
    container: {
      lib: mainLib,
      name: container,
    },
    editInfo: generateEditInfo(),
    meta: metaInfo,
    data: globalData,
    style: globalStyle,
    events: globalEvents,
    pageInstances: generatePageInstancesDSL(),
    sharedComponentInstances: sharedComponentInstances.length
      ? generateComponentInstancesDSL(sharedComponentInstances)
      : undefined,
    sharedPluginInstances: undefined,
  };

  return toJS(dsl, { recurseEverything: true });
}

function generateEditInfo() {
  const { layoutMode, pageMode } = editStore;
  return {
    layoutMode,
    pageMode,
    maxKeys: {
      [InstanceKeyType.Page]: getMaxKey(InstanceKeyType.Page),
      [InstanceKeyType.Component]: getMaxKey(InstanceKeyType.Component),
      [InstanceKeyType.HotArea]: getMaxKey(InstanceKeyType.HotArea),
      [InstanceKeyType.Plugin]: getMaxKey(InstanceKeyType.Plugin),
      [InstanceKeyType.Action]: getMaxKey(InstanceKeyType.Action),
    },
  };
}

function generatePageInstancesDSL(): PageInstanceDSL[] {
  const { pages } = pagesStore;
  return pages.map(page => {
    return {
      ...page,
      componentInstances: generateComponentInstancesDSL(page.componentInstances),
      pluginInstances: generatePluginInstancesDSL(page.pluginInstances),
    };
  });
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
