import { message } from 'antd';
import { parseUrl } from 'query-string';
import { ComponentInstance, JsonSchemaProperties, Maybe } from 'types';
import getDefaults from 'json-schema-defaults';
import { editStore } from 'states';
import { createSchema } from './create';

message.config({
  top: 60,
  duration: 2,
  maxCount: 3,
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export function isDev() {
  return process.env['NODE_ENV'] === 'development';
}

export function isDebugMode() {
  const {
    debugPorts: [debugPort],
  } = editStore;
  return !!debugPort;
}

interface QueryParams {
  id: Maybe<number>;
  key: string;
  libs: string[];
  debugPorts: number[];
  container: string;
}

export function getQueryParams(): QueryParams {
  const { query } = parseUrl(window.location.href);
  const { id, key, libs, debugPorts, container } = query;

  for (const k of ['key', 'libs', 'container']) {
    if (!query[k]) {
      throw new Error(`Missing require params: "${k}"`);
    }
  }

  return {
    id: id ? parseInt(id as string, 10) : undefined,
    key: key!.toString(),
    libs: libs!
      .toString()
      .split(',')
      .map(i => i.trim()),
    debugPorts: debugPorts
      ? debugPorts
          .toString()
          .split(',')
          .map(i => parseInt(i.trim(), 10))
      : [],
    container: container!.toString(),
  };
}

// TODO: Refactor
export function getImageSrc({ data }: ComponentInstance): Maybe<string> {
  if ('src' in data) {
    if (Array.isArray(data.src)) {
      return data.src[0] as string;
    }
    return data.src as string;
  }
  return null;
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

export function downloadString(text: string, fileType: string, fileName: string) {
  const blob = new Blob([text], { type: fileType });

  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = 'none';
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

export function getMaterialsIdentityName(libName: string, name: string) {
  return `${libName}_${name}`.toLocaleLowerCase();
}

export function getHotAreaId(key: number): string {
  return `__vize-hotarea-wrapper-${key}`;
}

export function px(px: number): string {
  return `${px}px`;
}

export function percent(percent: number): string {
  return `${percent}%`;
}

export function pxWithAuto(px: number | 'auto'): string {
  return px === 'auto' ? 'auto' : `${px}px`;
}
