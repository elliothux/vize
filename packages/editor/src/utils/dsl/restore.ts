import * as R from 'ramda';
import {
  ComponentEventTarget,
  ComponentInstance,
  DSL,
  EventTargetType,
  PageMode,
  PluginEventTarget,
  PluginInstance,
  InstanceKeyType,
  HotArea,
} from 'types';
import { componentsStore, globalStore, pagesStore, pluginsStore } from 'states';
import { parseDSL } from './parse';
import {
  addPageComponentInstanceIndexMap,
  addPagePluginInstanceIndexMap,
  generateComponentsIndex,
  generatePluginsIndex,
} from '../indexMap';
import { componentEventDepsMap, generateEventDepFromItem, pluginEventDepsMap } from '../depsMap';
import { setMaxKey } from '../key';

export function restoreState({ global, pageInstances, pluginInstances, editInfo }: ReturnType<typeof parseDSL>) {
  restoreGlobalState(global);
  restorePageInstances(pageInstances);
  if (global.pageMode === PageMode.SINGLE) {
    restorePluginInstances(0, pluginInstances!);
  }
  restoreEditInfo(editInfo);
}

function restoreGlobalState({ layoutMode, pageMode, globalProps, globalStyle, metaInfo }: DSL['global']) {
  return globalStore.setState(global => {
    global.layoutMode = layoutMode;
    global.pageMode = pageMode;
    global.globalProps = globalProps;
    global.globalStyle = globalStyle;
    global.metaInfo = metaInfo;
  });
}

function restorePageInstances(pages: ReturnType<typeof parseDSL>['pageInstances']) {
  return pages.forEach(([pageInstance, { componentInstances, pluginInstances }], index) => {
    pagesStore.setState(pagesStore => {
      if (index === 0) {
        pagesStore.pages = [pageInstance];
      } else {
        pagesStore.pages.push(pageInstance);
      }
    });
    restoreComponentInstances(pageInstance.key, componentInstances);
    if (globalStore.pageMode === PageMode.MULTI) {
      restorePluginInstances(pageInstance.key, pluginInstances!);
    }
  });
}

function restoreComponentInstances(pageKey: number, componentInstances: ComponentInstance[]) {
  componentsStore.setState(componentsStore => {
    componentsStore.pagesComponentInstancesMap[pageKey] = componentInstances;
    componentsStore.pagesComponentInstancesMap[pageKey].forEach(component => {
      component.children?.forEach(child => {
        child.parent = component;
      });
    });
  });

  const indexMap = generateComponentsIndex(componentInstances);
  addPageComponentInstanceIndexMap(pageKey, indexMap);

  componentInstances.forEach(R.unary(restoreEventDep));
}

function restorePluginInstances(pageKey: number, pluginInstances: PluginInstance[]) {
  pluginsStore.setState(pluginsStore => {
    if (globalStore.pageMode === PageMode.SINGLE) {
      pluginsStore.singlePagePluginsInstances = pluginInstances;
    } else {
      pluginsStore.pagesPluginInstancesMap[pageKey] = pluginInstances;
    }
  });

  const indexMap = generatePluginsIndex(pluginInstances);
  addPagePluginInstanceIndexMap(globalStore.pageMode === PageMode.SINGLE ? 0 : pageKey, indexMap);

  pluginInstances.forEach(R.unary(restoreEventDep));
}

function restoreEventDep(
  instance: ComponentInstance | PluginInstance | HotArea,
  parentInstance?: ComponentInstance,
  index?: number,
) {
  if ((instance as ComponentInstance).component) {
    componentEventDepsMap.createEventDepsMap(instance.key);
  } else {
    pluginEventDepsMap.createEventDepsMap(instance.key);
  }

  (instance as ComponentInstance)?.children?.forEach(R.unary(restoreEventDep));
  (instance as ComponentInstance)?.hotAreas?.forEach((hotArea, index) =>
    restoreEventDep(hotArea, instance as ComponentInstance, index),
  );

  return instance.events.forEach(event => {
    const { target } = event;
    const depForm = parentInstance
      ? generateEventDepFromItem(parentInstance, event, index)
      : generateEventDepFromItem(instance as ComponentInstance | PluginInstance, event);

    if (target.type === EventTargetType.COMPONENT) {
      componentEventDepsMap.addEventDep((target as ComponentEventTarget).key, depForm);
    } else if (target.type === EventTargetType.PLUGIN) {
      pluginEventDepsMap.addEventDep((target as PluginEventTarget).key, depForm);
    }
  });
}

function restoreEditInfo({ maxKeys }: ReturnType<typeof parseDSL>['editInfo']) {
  setMaxKey(InstanceKeyType.Page, maxKeys[InstanceKeyType.Page]);
  setMaxKey(InstanceKeyType.Component, maxKeys[InstanceKeyType.Component]);
  setMaxKey(InstanceKeyType.HotArea, maxKeys[InstanceKeyType.HotArea]);
  setMaxKey(InstanceKeyType.Plugin, maxKeys[InstanceKeyType.Plugin]);
  setMaxKey(InstanceKeyType.Action, maxKeys[InstanceKeyType.Action]);
}
