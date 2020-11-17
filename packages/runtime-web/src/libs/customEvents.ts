import { ComponentInstance, EventTriggerType, GlobalMeta, Maybe, PageRouter, PluginInstance } from '../../types';
import { pipeEvents } from '../utils/eventHandlers';

const componentCustomEventCallbackMap = new Map<number, Map<string, Function[]>>();
const pluginCustomEventCallbackMap = new Map<number, Map<string, Function[]>>();

export function onCustomEvent(type: 'component' | 'plugin', key: number, eventName: string, callback: Function) {
  const customEventCallbackMap = type === 'component' ? componentCustomEventCallbackMap : pluginCustomEventCallbackMap;
  let callbacksMap = customEventCallbackMap.get(key);
  if (!callbacksMap) {
    callbacksMap = new Map<string, Function[]>();
    customEventCallbackMap.set(key, callbacksMap);
  }

  const callbacks = callbacksMap.get(eventName);
  if (!callbacks) {
    callbacksMap.set(eventName, [callback]);
  } else {
    callbacks.push(callback);
  }

  return callbacks;
}

export function cancelCustomEvent(type: 'component' | 'plugin', key: number, eventName: string, callback: Function) {
  const callbacksMap = (type === 'component' ? componentCustomEventCallbackMap : pluginCustomEventCallbackMap).get(key);
  if (!callbacksMap) {
    return;
  }

  const callbacks = callbacksMap.get(eventName);
  if (!callbacks) {
    return;
  }

  const index = callbacks.findIndex(i => i === callback);
  callbacks.splice(index, 1);

  return callbacks;
}

export function getCustomEventCallbacks(
  type: 'component' | 'plugin',
  key: number,
  eventName: string,
): Maybe<Function[]> {
  const callbacksMap = (type === 'component' ? componentCustomEventCallbackMap : pluginCustomEventCallbackMap).get(key);
  if (!callbacksMap) {
    return null;
  }

  return callbacksMap.get(eventName);
}

export function emitCustomEvent(
  instance: ComponentInstance | PluginInstance,
  eventName: string,
  meta: GlobalMeta,
  global: object,
  router: PageRouter,
) {
  const events = instance.events.filter(
    ({ trigger }) => trigger.type === EventTriggerType.Custom && trigger.triggerName === eventName,
  );
  if (!events.length) {
    return;
  }

  const handler = pipeEvents(events, instance, router);
  return handler(undefined, { global, meta });
}
