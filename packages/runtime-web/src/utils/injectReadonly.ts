export function injectReadonly(key: string, value: any) {
  if (key in window) {
    return;
  }
  Object.defineProperty(window, key, {
    value,
    writable: false,
    configurable: false,
  });
}
