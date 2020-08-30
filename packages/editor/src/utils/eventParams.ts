import {
  ACTION_TRIGGER_PREFIX,
  ComponentInstance,
  EditorMaterialPluginEventListenerCallbackParams,
  HotArea,
  GlobalMeta,
  MaterialsComponentMeta,
  HotAreaParamsData,
  ComponentEventListenerTypes,
  HotAreaEventListenerTypes,
  PluginInstance,
  EditorMaterialPluginParams,
  EventInstance,
  EditorMaterialActionParams,
} from 'types';
import { materialsStore } from 'states';
import { componentNodes } from './componentNodes';

import { on } from '../utils';

export function generatePluginParams(
  plugin: PluginInstance,
  global: object,
  meta: GlobalMeta,
): EditorMaterialPluginParams {
  const { key, data } = plugin;
  return {
    key,
    data,
    meta,
    global,
    on,
    componentsMap: componentNodes,
  };
}

export function generateComponentActionParams(
  action: EventInstance,
  instance: ComponentInstance,
  global: object,
  meta: GlobalMeta,
): EditorMaterialActionParams {
  const { data, key, trigger } = action;

  return {
    key,
    data,
    triggerEventType: trigger.triggerName.replace(ACTION_TRIGGER_PREFIX, ''),
    trigger: {
      type: 'component',
      component: getComponentData(instance),
    },
    meta,
    global,
    componentsMap: componentNodes,
  };
}

export function generateHotareaActionParams(
  action: EventInstance,
  hotArea: HotArea,
  component: ComponentInstance,
  global: object,
  meta: GlobalMeta,
): EditorMaterialActionParams {
  const params = generateComponentActionParams(action, component, global, meta);
  params.trigger.type = 'hotarea';
  params.trigger.hotarea = getHotAreaData(hotArea, component);
  return params;
}

export function getComponentData({ component }: ComponentInstance): MaterialsComponentMeta {
  const { identityName, lib, name, info } = materialsStore.getComponentMeta(component);
  return {
    identityName,
    lib,
    name,
    info,
  };
}

export function getHotAreaData({ key, position, size }: HotArea, component: ComponentInstance): HotAreaParamsData {
  return {
    key,
    position,
    size,
    parent: getComponentData(component),
  };
}

export function generatePluginEventListenerCallbackParams(
  eventType: ComponentEventListenerTypes | HotAreaEventListenerTypes,
  global: object,
  meta: GlobalMeta,
  component: ComponentInstance,
  hotArea?: HotArea,
): EditorMaterialPluginEventListenerCallbackParams {
  const componentData = getComponentData(component);
  const hotAreaData = hotArea ? getHotAreaData(hotArea, component) : undefined;

  return {
    meta,
    global,
    triggerEventType: eventType,
    trigger: {
      type: hotArea ? 'hotarea' : 'component',
      component: componentData,
      hotarea: hotAreaData,
    },
    component: componentData,
    hotArea: hotAreaData,
  };
}
