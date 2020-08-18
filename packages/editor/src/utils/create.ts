import {
  ComponentInstance,
  JSONSchemaDefinition,
  JsonSchemaProperties,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  PageData,
  PageInstance,
  PluginInstance,
} from '../types';
import { generateKey, KeyType } from './key';
import { setPageData } from './page';
import { getSchemaDefault } from './common';
import { getDefaultCommonStyle } from './style';
import { isFunction } from './is';

export function createSchema(schema: JsonSchemaProperties): JSONSchemaDefinition {
  return {
    type: 'object',
    properties: schema,
  };
}

export function createPageInstance(name: string, isHome = false): PageInstance {
  const key = generateKey(KeyType.Page);
  const data: PageData = {
    components: [],
    plugins: [],
    actions: [],
  };
  setPageData(key, data);
  return {
    key,
    name,
    path: key.toString(),
    isHome,
    isNameEditing: false,
  };
}

export function createComponentInstance(
  { identityName, dataForm, styleForm, isContainer, enableWrapperStyleGroup,enableStyleGroup, hotArea }: MaterialsComponentMeta,
  freeLayout: boolean,
  initY = 0,
): ComponentInstance {
  const key = generateKey(KeyType.Component);
  const data = isFunction(dataForm) ? {} : getSchemaDefault(dataForm as JsonSchemaProperties);
  const style = isFunction(styleForm) ? {} : getSchemaDefault(styleForm as JsonSchemaProperties);

  return {
    key,
    component: identityName,
    data,
    style,
    commonStyle: getDefaultCommonStyle(enableStyleGroup),
    wrapperStyle: getDefaultCommonStyle(enableWrapperStyleGroup),
    actions: [],
    componentActions: [],
    pluginActions: [],
    layout: freeLayout ? { position: { x: 0, y: initY } } : undefined,
    children: isContainer ? [] : undefined,
    hotAreas: hotArea ? [] : undefined,
  };
}

export function createPluginInstance({ identityName, dataForm }: MaterialsPluginMeta): PluginInstance {
  const key = generateKey(KeyType.Plugin);
  const data = isFunction(dataForm) ? {} : getSchemaDefault(dataForm as JsonSchemaProperties);

  return {
    key,
    plugin: identityName,
    data,
  };
}
