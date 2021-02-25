import { getCurrentUser } from 'api';
import { message } from 'antd';

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
      return message.warn(tips || '没有操作权限');
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
