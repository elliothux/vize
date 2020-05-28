import { pagesStore } from "../states";
import { ComponentInstance, Maybe } from "../types";

type Index = number[];
export const pagesComponentIndexMap = new Map<number, Map<number, Index>>();

export function addPageComponentInstanceMap(pageKey: number) {
  pagesComponentIndexMap.set(pageKey, new Map<number, number[]>());
}

export function deletePageComponentInstanceMap(pageKey: number) {
  pagesComponentIndexMap.delete(pageKey);
}

function getCurrentPageComponentIndexMap() {
  return pagesComponentIndexMap.get(pagesStore.currentPage.key)!;
}

export function getCurrentPageComponentIndex(
  componentKey: number
): Maybe<Index> {
  return getCurrentPageComponentIndexMap().get(componentKey);
}

export function setCurrentPageComponentIndex(
  componentKey: number,
  index: Index
) {
  return getCurrentPageComponentIndexMap().set(componentKey, index);
}

export function deleteCurrentPageComponentIndex(
  componentKey: number,
  currentPageComponentInstances: ComponentInstance[]
): Index {
  const indexMap = getCurrentPageComponentIndexMap();
  const componentIndex = indexMap.get(componentKey)!;

  let [currentIndex] = componentIndex;
  indexMap.delete(currentPageComponentInstances[currentIndex]!.key);

  while (currentIndex < currentPageComponentInstances.length - 1) {
    const { key } = currentPageComponentInstances[currentIndex]!;
    const index = indexMap.get(key)!;
    index[0] -= 1;
    currentIndex++;
  }

  return componentIndex;
}
