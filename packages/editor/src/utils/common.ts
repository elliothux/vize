import { message } from 'antd';
import { parseUrl } from 'query-string';
import { ComponentInstance, JsonSchemaProperties, Maybe } from 'types';
import getDefaults from 'json-schema-defaults';
import { createSchema } from './create';

message.config({
  top: 60,
  duration: 2,
  maxCount: 3,
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

interface QueryParams {
  libs: string[];
  debugPorts: number[];
}

export function getQueryParams(): QueryParams {
  const {
    query: { libs, debugPorts },
  } = parseUrl(window.location.href);

  if (!libs) {
    throw new Error('No materials libs');
  }

  return {
    libs: libs
      .toString()
      .split(',')
      .map(i => i.trim()),
    debugPorts: debugPorts
      ? debugPorts
          .toString()
          .split(',')
          .map(i => parseInt(i.trim(), 10))
      : [],
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
