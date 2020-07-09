import { pagesStore } from '../states';
import { ComponentInstance, Maybe } from '../types';

type Index = [number, number?];
export const pagesComponentIndexMap = new Map<number, Map<number, Index>>();

export function addPageComponentInstanceMap(pageKey: number) {
    pagesComponentIndexMap.set(pageKey, new Map<number, Index>());
}

export function deletePageComponentInstanceMap(pageKey: number) {
    pagesComponentIndexMap.delete(pageKey);
}

function getCurrentPageComponentIndexMap() {
    return pagesComponentIndexMap.get(pagesStore.currentPage.key)!;
}

export function getCurrentPageComponentIndex(componentKey: number): Maybe<Index> {
    return getCurrentPageComponentIndexMap().get(componentKey);
}

export function setCurrentPageComponentIndex(componentKey: number, index: Index) {
    return getCurrentPageComponentIndexMap().set(componentKey, index);
}

export function deleteCurrentPageComponentIndex(
    componentKey: number,
    currentPageComponentInstances: ComponentInstance[],
): Index {
    const indexMap = getCurrentPageComponentIndexMap();
    const componentIndex = indexMap.get(componentKey)!;
    indexMap.delete(componentKey);

    let [currentIndex] = componentIndex;
    currentIndex++;
    while (currentIndex < currentPageComponentInstances.length) {
        const { key } = currentPageComponentInstances[currentIndex]!;
        const index = indexMap.get(key)!;
        index[0] -= 1;
        currentIndex++;
    }

    return componentIndex;
}

export function batchUpdateCurrentPageComponentIndex(
    currentPageComponentInstances: ComponentInstance[],
    oldIndex: number,
    newIndex: number,
    isContainerChildren = false,
) {
    const indexMap = getCurrentPageComponentIndexMap();
    const [start, end] = oldIndex > newIndex ? [newIndex, oldIndex] : [oldIndex, newIndex];
    for (let currentIndex = start; currentIndex <= end; currentIndex++) {
        const { key } = currentPageComponentInstances[currentIndex]!;
        const index = indexMap.get(key)!;
        index[isContainerChildren ? 1 : 0] = currentIndex;
    }
}
