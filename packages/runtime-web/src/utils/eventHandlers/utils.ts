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
  PluginEventTarget,
  PluginInstance,
} from '../../../types';
import { EventHandler, HandlerParams } from './types';
import * as React from 'react';
import { getCustomEventCallbacks, getMaterialsAction, getMaterialsActionMeta } from '../../libs';

export const DEFAULT_MAX_TIMEOUT = 10 * 1000;

export function timeoutPromise<T>(p: Promise<T>, t: number): Promise<T> {
  return timeout(p, t);
}

export function pipeEvents(
  events: EventInstance[],
  instance: ComponentInstance | PluginInstance | HotArea,
): EventHandler {
  return async (originalEvent: Maybe<React.SyntheticEvent>, { meta, global }: HandlerParams) => {
    for (const event of events) {
      const { target, data } = event;
      switch (target.type) {
        case EventTargetType.ACTION: {
          const { maxTimeout = DEFAULT_MAX_TIMEOUT } = getMaterialsActionMeta(target.id)!;
          const action = getMaterialsAction(target.id)!;
          const params: FirstParameter<MaterialsAction> = { data: data!, global, meta };

          try {
            if (maxTimeout === 'infinity') {
              await action(params);
            } else {
              const exec = action(params);
              if ((exec as unknown) instanceof Promise) {
                await timeoutPromise((exec as unknown) as Promise<void>, maxTimeout);
              }
            }
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
              await callback();
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
              await callback();
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
