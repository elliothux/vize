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
  GlobalEventTarget,
  EventTriggerName,
} from '../../../types';
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
  return async (
    originalEvent: Maybe<SyntheticEvent>,
    { meta, globalData, globalStyle, pageData, pageStyle }: HandlerParams,
  ) => {
    for (const event of events) {
      const { target, data } = event;
      switch (target.type) {
        case EventTargetType.Action: {
          const action = getMaterialsAction(target.id)!;
          const params: FirstParameter<MaterialsAction> = {
            data: data!,
            globalData,
            globalStyle,
            pageData,
            pageStyle,
            meta,
            router,
          };

          try {
            await execAsyncFunctionWithTimeout(action.bind(window.__iframeWindow), target.maxTimeout, params);
          } catch (e) {
            console.error('Action throw error: ', e);
          }
          break;
        }

        case EventTargetType.Component: {
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

        case EventTargetType.Plugin: {
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

        case EventTargetType.Global: {
          const { eventName } = target as GlobalEventTarget;
          const callbacks = getCustomEventCallbacks('global', eventName);
          if (!callbacks) {
            break;
          }

          for (const callback of callbacks) {
            try {
              await execAsyncFunctionWithTimeout(callback.bind(window.__iframeWindow), target.maxTimeout);
            } catch (e) {
              console.error(`Custom event callback on Global with EventName(${eventName}) throw error: `, e);
            }
          }
          break;
        }
        default: {
          throw new Error(`Invalid event target type: "${event.target.type}"`);
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

export function generateHandler(
  events: EventInstance[],
  trigger: EventTriggerName,
  router: PageRouter,
): EventHandler | undefined {
  const iEvents = events.filter(e => e.trigger.triggerName === trigger);
  if (!iEvents.length) {
    return undefined;
  }

  return pipeEvents(iEvents, router);
}
