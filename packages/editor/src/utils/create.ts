import {
  EventInstance,
  ComponentInstance,
  EventTarget,
  EventTargetType,
  EventTrigger,
  JSONSchemaDefinition,
  JsonSchemaProperties,
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  PageInstance,
  PluginInstance,
  InstanceKeyType,
} from 'types';
import { generateKey } from './key';
import { getFormDefaultValue } from './common';
import { getDefaultCommonStyle } from './style';
import { getMaterialsContainerMeta } from './container';

export function createSchema(schema: JsonSchemaProperties): JSONSchemaDefinition {
  return {
    type: 'object',
    properties: schema,
  };
}

export function createPageInstance(name: string, isHome = false): PageInstance {
  const { pageDataForm, pageStyleForm } = getMaterialsContainerMeta()!;
  const key = generateKey(InstanceKeyType.Page);
  return {
    key,
    name,
    path: key.toString(),
    isHome,
    data: getFormDefaultValue(pageDataForm),
    style: getFormDefaultValue(pageStyleForm),
    events: [],
    componentInstances: [],
    pluginInstances: [],
  };
}

export function createComponentInstance(
  {
    identityName,
    lib,
    dataForm,
    styleForm,
    isContainer,
    enableWrapperStyleGroup,
    enableStyleGroup,
    hotArea,
  }: MaterialsComponentMeta,
  freeLayout: boolean,
  initY = 0,
): ComponentInstance {
  return {
    key: generateKey(InstanceKeyType.Component),
    component: identityName,
    lib,
    data: getFormDefaultValue(dataForm),
    style: getFormDefaultValue(styleForm),
    commonStyle: getDefaultCommonStyle(enableStyleGroup),
    wrapperStyle: getDefaultCommonStyle(enableWrapperStyleGroup),
    events: [],
    layout: freeLayout ? { position: { x: 0, y: initY } } : undefined,
    children: isContainer ? [] : undefined,
    hotAreas: hotArea ? [] : undefined,
    shared: false,
  };
}

export function createPluginInstance({ identityName, dataForm, lib }: MaterialsPluginMeta): PluginInstance {
  return {
    key: generateKey(InstanceKeyType.Plugin),
    plugin: identityName,
    lib,
    data: getFormDefaultValue(dataForm),
    events: [],
  };
}

export function createEventInstance(
  trigger: EventTrigger,
  target: EventTarget,
  action?: MaterialsActionMeta,
): EventInstance {
  return {
    key: generateKey(InstanceKeyType.Action),
    data: target.type === EventTargetType.ACTION ? getFormDefaultValue(action!.dataForm) : undefined,
    trigger,
    target,
    events: [],
  };
}
