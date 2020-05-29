import * as R from 'ramda';

export function isNumber(i: any): boolean {
    return typeof i === 'number';
}

export function isEmpty(i: any): boolean {
    if (typeof i === 'string') return !i.trim();
    return R.isEmpty(i) || R.isNil(i) || Number.isNaN(i);
}

export function isFunction(i: any): boolean {
    return typeof i === 'function';
}
