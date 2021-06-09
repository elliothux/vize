export function isObject(i: any) {
  return Object.prototype.toString.call(i) === '[object Object]';
}

export function isMap(i: any) {
  return (
    Object.prototype.toString.call(i) === '[object Map]' ||
    (i && isFunction(i.delete) && isFunction(i.get) && isFunction(i.set))
  );
}

export function isFunction(i: any): boolean {
  return typeof i === 'function';
}

export function isArray(i: any) {
  return i && Array.isArray(i);
}
