import { Maybe, ComponentSelectedCallback } from '@vize/types/src';

const componentSelectedCallbackMap = new Map<number, ComponentSelectedCallback>();

export function setComponentSelectedCallback(componentKey: number, callback: ComponentSelectedCallback) {
  return componentSelectedCallbackMap.set(componentKey, callback);
}

export function getComponentSelectedCallback(componentKey: number): Maybe<ComponentSelectedCallback> {
  return componentSelectedCallbackMap.get(componentKey);
}

export function deleteComponentSelectedCallback(componentKey: number) {
  return componentSelectedCallbackMap.delete(componentKey);
}
