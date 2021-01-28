let dataGetter: Function | undefined;

export function registryDataGetter(fn: Function) {
  dataGetter = fn;
}

export function getData(key: number, type: 'component' | 'plugin') {
  return dataGetter ? dataGetter(key, type) : null;
}
