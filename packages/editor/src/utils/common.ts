import { parseUrl } from "query-string";
import { Maybe } from "../types";

export const noop = () => {};

interface QueryParams {
  lib: string;
  debugPort: Maybe<number>;
}

export function getQueryParams(): QueryParams {
  const {
    query: { lib, debugPort }
  } = parseUrl(window.location.href);
  return {
    lib: lib as string,
    debugPort: debugPort ? parseInt(debugPort as string, 10) : null
  };
}

export type PromiseResult<T> = Promise<[null, T] | [Error, null]>;

export function promiseWrapper<T>(p: Promise<T>): PromiseResult<T> {
  return new Promise(resolve => {
    try {
      p.then(i => resolve([null, i as T])).catch(e => resolve([e, null]));
    } catch (e) {
      resolve([e, null]);
    }
  });
}

export function isNumber(v: any): boolean {
  return typeof v === "number";
}

export function wait(time: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, time));
}
