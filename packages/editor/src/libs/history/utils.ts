import { isFunction } from '../../utils';

export type Snapshot = {
  [propName: string]: any;
};

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isMap(obj: any) {
  return (
    Object.prototype.toString.call(obj) === '[object Map]' ||
    (obj && isFunction(obj.delete) && isFunction(obj.get) && isFunction(obj.set))
  );
}
function isArray(obj: any) {
  return obj && Array.isArray(obj);
}

export function walkAndSerialize(model: any) {
  if (isArray(model)) {
    return model.length ? model.map(walkAndSerialize) : [];
  }

  if (isMap(model)) {
    if (model.size) {
      const map: { [key: string]: any } = {};
      model.forEach((value: any, key: string) => {
        map[key] = walkAndSerialize(value);
      });
      return map;
    }
    return {};
  }

  if (isObject(model)) {
    return Object.keys(model).reduce((acc, stateName) => {
      const value = walkAndSerialize(model[stateName]);
      if (value !== undefined) {
        acc[stateName] = value;
      }
      return acc;
    }, {} as Snapshot);
  }

  if (isFunction(model)) {
    return undefined;
  }

  return model;
}
