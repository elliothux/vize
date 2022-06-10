import { ComponentIndex, ComponentIndexMapEntries } from './componentIndexMap';
import { ComponentInstance, Maybe } from '@vize/types';

let sharedComponentIndexMap = new Map<number, ComponentIndex>();

export function setSharedComponentIndexMap(entries: ComponentIndexMapEntries) {
  sharedComponentIndexMap = new Map<number, ComponentIndex>(entries);
}

export function getSharedComponentIndex(componentKey: number): Maybe<ComponentIndex> {
  return sharedComponentIndexMap.get(componentKey);
}

export function setSharedComponentIndex(componentKey: number, index: ComponentIndex) {
  return sharedComponentIndexMap.set(componentKey, index);
}

export function deleteSharedComponentIndex(
  componentKey: number,
  currentSharedComponentInstances: ComponentInstance[],
): ComponentIndex {
  const index = sharedComponentIndexMap.get(componentKey)!;
  sharedComponentIndexMap.delete(componentKey);
  for (let i = index.index + 1; i < currentSharedComponentInstances.length; i++) {
    sharedComponentIndexMap.set(currentSharedComponentInstances[i].key, { index: i - 1 });
    // TODO: update children index
  }
  return index;
}
