import { parseUrl } from "query-string";
import { JsonSchemaProperties, Maybe } from "../types";
import getDefaults from "json-schema-defaults";
import { createSchema } from "./create";

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

export function wait(time: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, time));
}

export function injectGlobal(key: string, value: any) {
  return Object.defineProperty(window, key, {
    get() {
      return typeof value === "function" ? value() : value;
    }
  });
}

export function downloadString(
  text: string,
  fileType: string,
  fileName: string
) {
  const blob = new Blob([text], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

export function getSchemaDefault(schema: JsonSchemaProperties) {
  return getDefaults(createSchema(schema));
}
