import {
    ComponentInstance,
    JSONSchemaDefinition,
    JsonSchemaProperties,
    MaterialsComponentMeta,
    PageData,
    PageInstance,
} from '../types';
import { generateKey, KeyType } from './key';
import { setPageData } from './page';
import { getSchemaDefault } from './common';
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
        global: {},
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

export function createComponentInstance({ identityName, dataForm }: MaterialsComponentMeta): ComponentInstance {
    const key = generateKey(KeyType.Comppnent);
    const data = isFunction(dataForm) ? {} : getSchemaDefault(dataForm as JsonSchemaProperties);

    return {
        key,
        component: identityName,
        data,
        style: {},
        actions: [],
    };
}
