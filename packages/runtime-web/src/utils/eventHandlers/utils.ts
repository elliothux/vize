import { SyntheticEvent } from 'react';
import { timeout } from 'promise-timeout';
import {
  ComponentEventTarget,
  EventInstance,
  EventTargetType,
  FirstParameter,
  MaterialsAction,
  Maybe,
  PageRouter,
  PluginEventTarget,
} from '@vize/types';
import { EventHandler, HandlerParams } from './types';
import { getCustomEventCallbacks, getMaterialsAction } from '../../libs';

declare global {
  interface Window {
    __iframeWindow: Window;
  }
}

export function timeoutPromise<T>(p: Promise<T>, t: number): Promise<T> {
  return timeout(p, t);
}

export function pipeEvents(events: EventInstance[], router: PageRouter): EventHandler {
  return async (originalEvent: Maybe<SyntheticEvent>, { meta, global }: HandlerParams) => {
    for (const event of events) {
      const { target, data } = event;
      switch (target.type) {
        case EventTargetType.ACTION: {
          const action = getMaterialsAction(target.id)!;
          const params: FirstParameter<MaterialsAction> = { data: data!, global, meta, router };

          try {
            await execAsyncFunctionWithTimeout(action.bind(window.__iframeWindow), target.maxTimeout, params);
          } catch (e) {
            console.error('Action throw error: ', e);
          }
          break;
        }

        case EventTargetType.COMPONENT: {
          const { key, eventName } = target as ComponentEventTarget;
          const callbacks = getCustomEventCallbacks('component', eventName, key);
          if (!callbacks) {
            break;
          }

          for (const callback of callbacks) {
            try {
              await execAsyncFunctionWithTimeout(callback.bind(window.__iframeWindow), target.maxTimeout);
            } catch (e) {
              console.error(
                `Custom event callback on Component(key = ${key}) with EventName(${eventName}) throw error: `,
                e,
              );
            }
          }
          break;
        }

        case EventTargetType.PLUGIN: {
          const { key, eventName } = target as PluginEventTarget;
          const callbacks = getCustomEventCallbacks('plugin', eventName, key);
          if (!callbacks) {
            break;
          }

          for (const callback of callbacks) {
            try {
              await execAsyncFunctionWithTimeout(callback.bind(window.__iframeWindow), target.maxTimeout);
            } catch (e) {
              console.error(
                `Custom event callback on Plugin(key = ${key}) with EventName(${eventName}) throw error: `,
                e,
              );
            }
          }
          break;
        }
      }
    }
  };
}

async function execAsyncFunctionWithTimeout(fn: Function, maxTimeout: number | 'infinity', params?: any) {
  if (maxTimeout === 'infinity') {
    await fn(params);
  } else {
    const exec: unknown = fn(params);
    if (exec instanceof Promise) {
      await timeoutPromise(exec as Promise<void>, maxTimeout as number);
    }
  }
}
