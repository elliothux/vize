import { componentsStore, pagesStore } from 'states';
import { ComponentInstance, Maybe } from 'types';
import { isNumber } from '../is';

export interface ComponentIndex {
  index: number;
  parentIndex?: number;
}

export const pagesComponentIndexMap = new Map<number, Map<number, ComponentIndex>>();

type ComponentIndexMapEntries = (readonly [number, ComponentIndex])[];
export function addPageComponentInstanceMap(pageKey: number, entries?: ComponentIndexMapEntries) {
  pagesComponentIndexMap.set(pageKey, new Map<number, ComponentIndex>(entries));
}

export function deletePageComponentInstanceMap(pageKey: number) {
  pagesComponentIndexMap.delete(pageKey);
}

function getCurrentPageComponentIndexMap() {
  return pagesComponentIndexMap.get(pagesStore.currentPage.key)!;
}

export function getCurrentPageComponentIndex(componentKey: number): Maybe<ComponentIndex> {
  return getCurrentPageComponentIndexMap().get(componentKey);
}

export function setCurrentPageComponentIndex(componentKey: number, index: ComponentIndex) {
  return getCurrentPageComponentIndexMap().set(componentKey, index);
}

export function deleteCurrentPageComponentIndex(
  componentKey: number,
  currentPageComponentInstances: ComponentInstance[],
): ComponentIndex {
  const indexMap = getCurrentPageComponentIndexMap();
  const componentIndex = indexMap.get(componentKey)!;
  const instance = componentsStore.getCurrentPageComponentInstance(componentKey);

  indexMap.delete(componentKey);
  instance?.children?.forEach(({ key }) => indexMap.delete(key));

  const { index, parentIndex } = componentIndex;
  const isChildrenComponent = isNumber(parentIndex);

  // Update all index after current component
  const componentInstances = isChildrenComponent
    ? currentPageComponentInstances[parentIndex!].children!
    : currentPageComponentInstances;

  let i = index + 1;
  while (i < componentInstances.length) {
    const { key, children } = componentInstances[i]!;
    const componentIndex = indexMap.get(key)!;
    componentIndex.index -= 1;

    if (children && children.length > 0) {
      batchUpdateCurrentPageComponentIndex(children, 0, children.length - 1);
    }

    i++;
  }

  return componentIndex;
}

export function batchUpdateCurrentPageComponentIndex(
  currentPageComponentInstances: ComponentInstance[],
  oldIndex: number,
  newIndex: number,
) {
  const indexMap = getCurrentPageComponentIndexMap();
  const [start, end] = oldIndex > newIndex ? [newIndex, oldIndex] : [oldIndex, newIndex];

  for (let currentIndex = start; currentIndex <= end; currentIndex++) {
    const { key, children } = currentPageComponentInstances[currentIndex]!;
    const componentIndex = indexMap.get(key)!;

    componentIndex.index = currentIndex;

    children?.forEach(({ key }) => {
      const componentIndex = indexMap.get(key)!;
      componentIndex.parentIndex = currentIndex;
    });
  }
}

export function regenerateCurrentPageComponentIndex(currentPageComponentInstances: ComponentInstance[]) {
  deletePageComponentInstanceMap(pagesStore.currentPage.key);
  const entries = currentPageComponentInstances.reduce<ComponentIndexMapEntries>((accu, { key, children }, index) => {
    accu.push([key, { index }]);
    children?.forEach(({ key }, childIndex) => {
      accu.push([key, { parentIndex: index, index: childIndex }]);
    });
    return accu;
  }, []);
  addPageComponentInstanceMap(pagesStore.currentPage.key, entries);
}

export function compareComponentIndex(a: ComponentIndex, b: ComponentIndex) {
  return a.index === b.index && a.parentIndex === b.parentIndex;
}

export function findComponentInstanceByIndex(
  componentInstances: ComponentInstance[],
  { index, parentIndex }: ComponentIndex,
) {
  return isNumber(parentIndex) ? componentInstances[parentIndex!].children![index] : componentInstances[index];
}
