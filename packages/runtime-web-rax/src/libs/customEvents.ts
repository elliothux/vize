import { ComponentInstance, EventTriggerType, GlobalMeta, Maybe, PageRouter, PluginInstance } from '@vize/types';
import { pipeEvents } from '../utils/eventHandlers';

type CallbackType = 'component' | 'plugin' | 'global' | 'page';
type CallbacksMap = Map<string, Function[]>;

const globalCustomEventCallbackMap: CallbacksMap = new Map();
const pagesCustomEventCallbackMap = new Map<number, CallbacksMap>();
const componentCustomEventCallbackMap = new Map<number, CallbacksMap>();
const pluginCustomEventCallbackMap = new Map<number, CallbacksMap>();

function getCallbacksMap(type: CallbackType, autoCreate: boolean, key?: number): Maybe<CallbacksMap> {
  let callbacksMap: CallbacksMap;
  if (type === 'global') {
    callbacksMap = globalCustomEventCallbackMap;
  } else {
    const customEventCallbackMap =
      type === 'component'
        ? componentCustomEventCallbackMap
        : type === 'plugin'
        ? pluginCustomEventCallbackMap
        : pagesCustomEventCallbackMap;
    callbacksMap = customEventCallbackMap.get(key!);
    if (!callbacksMap && autoCreate) {
      callbacksMap = new Map<string, Function[]>();
      customEventCallbackMap.set(key!, callbacksMap);
    }
  }
  return callbacksMap;
}

export function onCustomEvent(type: CallbackType, eventName: string, callback: Function, key?: number) {
  const callbacksMap = getCallbacksMap(type, true, key);
  const callbacks = callbacksMap.get(eventName);
  if (!callbacks) {
    callbacksMap.set(eventName, [callback]);
  } else {
    callbacks.push(callback);
  }

  return callbacks;
}

export function cancelCustomEvent(type: CallbackType, eventName: string, callback: Function, key?: number) {
  const callbacksMap = getCallbacksMap(type, false, key);
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
