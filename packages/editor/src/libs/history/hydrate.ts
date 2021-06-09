import { isArray, isMap, isObject, isFunction } from './utils';

export function dehydrate(state: any) {
  if (isArray(state)) {
    return state.length ? state.map(dehydrate) : [];
  }

  if (isMap(state)) {
    if (state.size) {
      const map: { [key: string]: any } = {};
      state.forEach((value: any, key: string) => {
        map[key] = dehydrate(value);
      });
      return map;
    }
    return {};
  }

  if (isObject(state)) {
    return Object.keys(state).reduce<Record<string, any>>((acc, stateName) => {
      const value = dehydrate(state[stateName]);
      if (value !== undefined) {
        acc[stateName] = value;
      }
      return acc;
    }, {});
  }

  if (isFunction(state)) {
    return undefined;
  }

  return state;
}
