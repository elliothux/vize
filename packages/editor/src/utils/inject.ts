export function injectGlobalReadonlyGetter(key: string, getter: () => any) {
  return injectReadonlyGetter(window, key, getter);
}

export function injectReadonly(target: object, key: string, value: any): void {
  if (target.hasOwnProperty(key)) {
    console.info(`Skip inject "${key}" on ${target.toString()}, it's already exists.`);
    return;
  }

  Object.defineProperty(target, key, {
    value,
    writable: false,
    configurable: false,
  });
}

export function injectReadonlyGetter(target: object, key: string, getter: () => any): void {
  if (target.hasOwnProperty(key)) {
    console.info(`Skip inject "${key}" on ${target.toString()}, it's already exists.`);
    return;
  }

  Object.defineProperty(target, key, {
    get: getter,
    configurable: false,
  });
}
