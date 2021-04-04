import * as R from 'ramda';
import { editStore, globalStore, pagesStore, sharedStore } from 'states';
import { getPage } from 'api';
import { message } from 'antd';
import { i18n } from 'i18n';
import {
  ComponentEventTarget,
  ComponentInstance,
  DSL,
  EditInfoDSL,
  EventInstance,
  EventTargetType,
  HotArea,
  InstanceKeyType,
  PageInstance,
  PluginEventTarget,
  PluginInstance,
} from 'types';
import { UserRecord } from 'sharedTypes';
import { isDebugMode } from 'utils';
import { setMaxKey } from '../../key';
import {
  addPageComponentInstanceIndexMap,
  addPagePluginInstanceIndexMap,
  generateComponentsIndex,
  generatePluginsIndex,
  setSharedComponentIndexMap,
} from '../../indexMap';
import { componentEventDepsMap, DepsFromType, generateEventDepFromItem, pluginEventDepsMap } from '../../depsMap';
import { parseDSL } from './parse';
import { filterComponent, filterPlugin } from './utils';

export async function restore() {
  if (isDebugMode()) {
    const dslString = localStorage.getItem('dsl');
    if (!dslString) {
      return;
    }

    return restoreStateFromDSL(dslString);
  }

  const [success, result] = await getPage(editStore.pageKey);
  if (!success) {
    console.error(result);
    message.error(i18n.t('failed to get page data'));
    return;
  }

  const { owner, latestHistory } = result!;
  restoreExtraInfo({ owner });
  return restoreStateFromDSL(latestHistory!.dsl);
}

function restoreStateFromDSL(dsl: string) {
  const parsedDSL = parseDSL(JSON.parse(dsl) as DSL);
  const { editInfo, pageInstances, sharedComponentInstances } = parsedDSL;

  restoreGlobal(parsedDSL);
  restoreEditInfo(editInfo);
  restorePageInstances(pageInstances);
  if (sharedComponentInstances) {
    restoreSharedComponentInstances(sharedComponentInstances);
  }
}

function restoreGlobal({ data, style, events, meta }: ReturnType<typeof parseDSL>) {
  restoreEventDep(DepsFromType.Global, { events });
  return globalStore.setState(store => {
    store.globalData = data;
    store.globalStyle = style;
    store.globalEvents = events;
    store.metaInfo = meta;
  });
}

function restorePageInstances(pages: PageInstance[]) {
  pagesStore.setState(store => (store.pages = pages));
  return pages.forEach(page => {
    const { key, componentInstances, pluginInstances } = page;
    restoreComponentInstances(key, componentInstances);
    restorePluginInstances(key, pluginInstances!);
    restoreEventDep(DepsFromType.Page, page);
  });
}

function restoreComponentInstances(pageKey: number, iComponentInstances: ComponentInstance[]) {
  const componentInstances = iComponentInstances.filter(filterComponent);
  const indexMap = generateComponentsIndex(componentInstances);
  addPageComponentInstanceIndexMap(pageKey, indexMap);
  componentInstances.forEach(R.unary(R.partial(restoreEventDep, [DepsFromType.Component])));
}

function restorePluginInstances(pageKey: number, iPluginInstances: PluginInstance[]) {
  const pluginInstances = iPluginInstances.filter(filterPlugin);
  const indexMap = generatePluginsIndex(pluginInstances);
  addPagePluginInstanceIndexMap(pageKey, indexMap);
  pluginInstances.forEach(R.unary(R.partial(restoreEventDep, [DepsFromType.Plugin])));
}

function restoreSharedComponentInstances(iComponentInstances: ComponentInstance[]) {
  const componentInstances = iComponentInstances.filter(filterComponent);
  sharedStore.setState(sharedStore => (sharedStore.sharedComponentInstances = componentInstances));

  const indexMap = generateComponentsIndex(componentInstances);
  setSharedComponentIndexMap(indexMap);
  componentInstances.forEach(R.unary(R.partial(restoreEventDep, [DepsFromType.Component])));
}

function restoreEventDep(
  depsFromType: DepsFromType,
  instance: PageInstance | ComponentInstance | PluginInstance | HotArea | { events: EventInstance[] },
  parentInstance?: ComponentInstance,
  index?: number,
) {
  if (depsFromType === DepsFromType.Component) {
    (instance as ComponentInstance)?.children?.forEach(R.unary(R.partial(restoreEventDep, [DepsFromType.Component])));
    (instance as ComponentInstance)?.hotAreas?.forEach((hotArea, index) =>
      restoreEventDep(DepsFromType.HotArea, hotArea, instance as ComponentInstance, index),
    );
  }

  return instance.events.forEach(event => {
    const { target } = event;
    const depForm = parentInstance
      ? generateEventDepFromItem(depsFromType, parentInstance, event, index)
      : generateEventDepFromItem(depsFromType, instance as ComponentInstance | PluginInstance, event);

    if (target.type === EventTargetType.Component) {
      componentEventDepsMap.addEventDep((target as ComponentEventTarget).key, depForm);
    } else if (target.type === EventTargetType.Plugin) {
      pluginEventDepsMap.addEventDep((target as PluginEventTarget).key, depForm);
    }
  });
}

function restoreEditInfo({ maxKeys, layoutMode, pageMode }: EditInfoDSL) {
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

interface ExtraInfo {
  owner: UserRecord;
}

function restoreExtraInfo({ owner }: ExtraInfo) {
  return editStore.setState(store => {
    store.owner = owner;
  }, true);
}
