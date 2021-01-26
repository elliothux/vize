import * as Rax from 'rax';
import { timeout } from 'promise-timeout';
import {
  ComponentEventTarget,
  ComponentInstance,
  EventInstance,
  EventTargetType,
  FirstParameter,
  HotArea,
  MaterialsAction,
  Maybe,
  PageRouter,
  PluginEventTarget,
  PluginInstance,
} from '@vize/types/src';
import { EventHandler, HandlerParams } from './types';
import { getCustomEventCallbacks, getMaterialsAction } from '../../libs';

export function timeoutPromise<T>(p: Promise<T>, t: number): Promise<T> {
  return timeout(p, t);
}

export function pipeEvents(
  events: EventInstance[],
  instance: ComponentInstance | PluginInstance | HotArea,
  router: PageRouter,
): EventHandler {
  return async (originalEvent: Maybe<Rax.SyntheticEvent>, { meta, global }: HandlerParams) => {
    for (const event of events) {
      const { target, data } = event;
      switch (target.type) {
        case EventTargetType.ACTION: {
          const action = getMaterialsAction(target.id)!;
          const params: FirstParameter<MaterialsAction> = { data: data!, global, meta, router };

          try {
            await execAsyncFunctionWithTimeou(action, target.maxTimeout, params);
          } catch (e) {
            console.error('Action throw error: ', e);
          }
        }

        case EventTargetType.COMPONENT: {
          const { key, eventName } = target as ComponentEventTarget;
          const callbacks = getCustomEventCallbacks('component', key, eventName);
          if (!callbacks) {
            break;
          }

          for (const callback of callbacks) {
            try {
              await execAsyncFunctionWithTimeou(callback, target.maxTimeout);
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
          const callbacks = getCustomEventCallbacks('plugin', key, eventName);
          if (!callbacks) {
            break;
          }

          for (const callback of callbacks) {
            try {
              await execAsyncFunctionWithTimeou(callback, target.maxTimeout);
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

async function execAsyncFunctionWithTimeou(fn: Function, maxTimeout: number | 'infinity', params?: any) {
  if (maxTimeout === 'infinity') {
    await fn(params);
  } else {
    const exec: unknown = fn(params);
    if (exec instanceof Promise) {
      await timeoutPromise(exec as Promise<void>, maxTimeout as number);
    }
  }
}
