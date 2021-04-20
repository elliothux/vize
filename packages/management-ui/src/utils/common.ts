import * as React from 'react';
import { getCurrentUser } from 'api';
import { message } from 'antd';
import { i18n } from 'i18n';

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

export function withAdminValidation(fn: Function, tips?: string) {
  return async (...args: any[]) => {
    const [, user] = await getCurrentUser();
    if (!user?.isAdmin) {
      message.destroy();
      return message.warn(tips || i18n.t('No operation permission'));
    }
    return fn(...args);
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export function downloadFile(src: string, fileName: string) {
  const a = document.createElement('a');
  a.href = src;
  a.download = fileName;
  a.style.zIndex = '-1';
  a.style.position = 'fixed';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

export function withMessage(
  operation: (...args: any[]) => any,
  msg: string | (() => string),
  type: 'success' | 'warn' | 'error' | 'open' = 'open',
) {
  return () => {
    const content = typeof msg === 'string' ? msg : msg();
    message.destroy();
    if (type === 'open') {
      message.open({
        content,
        icon: React.createElement('span', {}),
        duration: 2,
        type: 'success',
      });
    } else {
      message[type](content);
    }
    return operation();
  };
}

export const unImplemented = withMessage(noop, i18n.t('This feature is still under development'), 'warn');
