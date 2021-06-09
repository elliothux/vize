import { isArray, isMap, isObject, isFunction } from './utils';

export function dehydrate(model: any) {
  if (isArray(model)) {
    return model.length ? model.map(dehydrate) : [];
  }

  if (isMap(model)) {
    if (model.size) {
      const map: { [key: string]: any } = {};
      model.forEach((value: any, key: string) => {
        map[key] = dehydrate(value);
      });
      return map;
    }
    return {};
  }

  if (isObject(model)) {
    return Object.keys(model).reduce<Record<string, any>>((acc, stateName) => {
      const value = dehydrate(model[stateName]);
      if (value !== undefined) {
        acc[stateName] = value;
      }
      return acc;
    }, {});
  }

  if (isFunction(model)) {
    return undefined;
  }

  return model;
}
