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
  MustBe,
} from 'types';
import { UserRecord } from 'sharedTypes';
import { componentsStore, editStore, globalStore, pagesStore, pluginsStore, sharedStore } from 'states';
import { parseDSLFromLocalStorage } from './parse';
import {
  addPageComponentInstanceIndexMap,
  addPagePluginInstanceIndexMap,
  generateComponentsIndex,
  generatePluginsIndex,
  setSharedComponentIndexMap,
} from '../indexMap';
import { componentEventDepsMap, generateEventDepFromItem, pluginEventDepsMap } from '../depsMap';
import { setMaxKey } from '../key';
import { getMaterialsComponentMeta, getMaterialsPluginMeta } from 'runtime';

export function restoreState(
  {
    global,
    pageInstances,
    pluginInstances,
    sharedComponentInstances,
    editInfo,
  }: ReturnType<typeof parseDSLFromLocalStorage>,
  extraInfo?: ExtraInfo,
) {
  restoreEditInfo(editInfo);
  restorePageInstances(pageInstances);

  if (sharedComponentInstances?.length) {
    restoreSharedComponentInstances(sharedComponentInstances);
  }

  if (editInfo.pageMode === PageMode.SINGLE) {
    restorePluginInstances(0, pluginInstances!);
    restoreGlobalState(global!);
  }

  if (extraInfo) {
    restoreExtraInfo(extraInfo);
  }
}

interface ExtraInfo {
  owner: UserRecord;
}

function restoreExtraInfo({ owner }: ExtraInfo) {
  return editStore.setState(store => {
    store.owner = owner;
  }, true);
}

function restoreGlobalState({ globalProps, globalStyle, metaInfo }: MustBe<DSL['global']>) {
  return globalStore.setState(global => {
    global.globalProps = globalProps;
    global.globalStyle = globalStyle;
    global.metaInfo = metaInfo;
  });
}

function restorePageInstances(pages: ReturnType<typeof parseDSLFromLocalStorage>['pageInstances']) {
  return pages.forEach(([pageInstance, { componentInstances, pluginInstances }], index) => {
    pagesStore.setState(pagesStore => {
      if (index === 0) {
        pagesStore.pages = [pageInstance];
      } else {
        pagesStore.pages.push(pageInstance);
      }
    });
    restoreComponentInstances(pageInstance.key, componentInstances);
    if (!editStore.isSinglePageMode) {
      restorePluginInstances(pageInstance.key, pluginInstances!);
    }
  });
}

function restoreComponentInstances(pageKey: number, iComponentInstances: ComponentInstance[]) {
  const componentInstances = iComponentInstances.filter(filterComponent);
  componentsStore.setState(componentsStore => {
    componentsStore.pagesComponentInstancesMap[pageKey] = componentInstances;
    componentsStore.pagesComponentInstancesMap[pageKey].forEach(component => {
      component.children?.forEach(child => {
        child.parent = component;
      });
      component.hotAreas?.forEach(hotarea => {
        hotarea.parent = component;
      });
    });
  });

  const indexMap = generateComponentsIndex(componentInstances);
  addPageComponentInstanceIndexMap(pageKey, indexMap);

  componentInstances.forEach(R.unary(restoreEventDep));
}

function restoreSharedComponentInstances(iComponentInstances: ComponentInstance[]) {
  const componentInstances = iComponentInstances.filter(filterComponent);
  sharedStore.setState(sharedStore => {
    sharedStore.sharedComponentInstances = componentInstances;
    sharedStore.sharedComponentInstances.forEach(component => {
      component.children?.forEach(child => {
        child.parent = component;
      });
      component.hotAreas?.forEach(hotarea => {
        hotarea.parent = component;
      });
    });
  });

  const indexMap = generateComponentsIndex(componentInstances);
  setSharedComponentIndexMap(indexMap);

  componentInstances.forEach(R.unary(restoreEventDep));
}

function restorePluginInstances(pageKey: number, iPluginInstances: PluginInstance[]) {
  const pluginInstances = iPluginInstances.filter(filterPlugin);
  pluginsStore.setState(pluginsStore => {
    if (editStore.isSinglePageMode) {
      pluginsStore.singlePagePluginsInstances = pluginInstances;
    } else {
      pluginsStore.pagesPluginInstancesMap[pageKey] = pluginInstances;
    }
  });

  const indexMap = generatePluginsIndex(pluginInstances);
  addPagePluginInstanceIndexMap(editStore.isSinglePageMode ? 0 : pageKey, indexMap);

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

function restoreEditInfo({ maxKeys, layoutMode, pageMode }: ReturnType<typeof parseDSLFromLocalStorage>['editInfo']) {
  editStore.setState(editStore => {
    editStore.layoutMode = layoutMode;
    editStore.pageMode = pageMode;
  });

  if (maxKeys) {
    setMaxKey(InstanceKeyType.Page, maxKeys[InstanceKeyType.Page]);
    setMaxKey(InstanceKeyType.Component, maxKeys[InstanceKeyType.Component]);
    setMaxKey(InstanceKeyType.HotArea, maxKeys[InstanceKeyType.HotArea]);
    setMaxKey(InstanceKeyType.Plugin, maxKeys[InstanceKeyType.Plugin]);
    setMaxKey(InstanceKeyType.Action, maxKeys[InstanceKeyType.Action]);
  }
}

function filterComponent(i: ComponentInstance) {
  const meta = getMaterialsComponentMeta(i.component);
  if (!meta) {
    console.error(`Component "${i.component}" not found`);
  }
  return !!meta;
}

function filterPlugin(i: PluginInstance) {
  const meta = getMaterialsPluginMeta(i.plugin);
  if (!meta) {
    console.error(`Plugin "${i.plugin}" not found`);
  }
  return !!meta;
}
