import { Maybe } from '../../types/helper';

const editChildrenCallbackMap = new Map<number, Function>();

export function setEditChildrenCallback(componentKey: number, callback: Function) {
  return editChildrenCallbackMap.set(componentKey, callback);
}

export function getEditChildrenCallback(componentKey: number): Maybe<Function> {
  return editChildrenCallbackMap.get(componentKey);
}

export function deleteEditChildrenCallback(componentKey: number) {
  return editChildrenCallbackMap.delete(componentKey);
}
