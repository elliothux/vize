import { pagesStore } from '../states';
import { ComponentInstance, Maybe } from '../types';
import { isNumber } from './is';

type Index = number;
type ParentIndex = number;

export type ComponentIndex = [Index, ParentIndex?];

export const pagesComponentIndexMap = new Map<number, Map<number, ComponentIndex>>();

export function addPageComponentInstanceMap(pageKey: number) {
    pagesComponentIndexMap.set(pageKey, new Map<number, ComponentIndex>());
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
    indexMap.delete(componentKey);

    const [currentIndex, parentIndex] = componentIndex;
    const isContainerChildren = isNumber(parentIndex);

    // Update all index after current component
    let i = currentIndex + 1;
    let componentInstances = currentPageComponentInstances;
    if (isContainerChildren) {
        componentInstances = currentPageComponentInstances[parentIndex!].children!;
    }

    while (i < componentInstances.length) {
        const { key } = componentInstances[i]!;
        const index = indexMap.get(key)!;
        index[isContainerChildren ? 1 : 0] -= 1;
        i++;
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

export function findComponentInstanceByIndex(
    componentInstances: ComponentInstance[],
    [index, parentIndex]: ComponentIndex,
) {
    return isNumber(parentIndex) ? componentInstances[parentIndex!].children![index] : componentInstances[index];
}
