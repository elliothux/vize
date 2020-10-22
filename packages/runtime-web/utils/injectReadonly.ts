export function injectReadonly(key: string, value: any) {
  Object.defineProperty(window, key, {
    value,
    writable: false,
    configurable: false,
  });
}
