import { pagesStore } from 'states';
import { PluginInstance, Maybe } from 'types';

type PluginIndex = number;

export const pagesPluginIndexMap = new Map<number, Map<number, PluginIndex>>();

type PluginIndexMapEntries = (readonly [number, PluginIndex])[];

export function addPagePluginInstanceIndexMap(pageKey: number, entries?: PluginIndexMapEntries) {
  pagesPluginIndexMap.set(pageKey, new Map<number, PluginIndex>(entries));
}

export function deletePagePluginInstanceIndexMap(pageKey: number) {
  pagesPluginIndexMap.delete(pageKey);
}

function getCurrentPagePluginIndexMap() {
  return pagesPluginIndexMap.get(pagesStore.currentPage.key)!;
}

export function getCurrentPagePluginIndex(pluginKey: number): Maybe<PluginIndex> {
  return getCurrentPagePluginIndexMap().get(pluginKey);
}

export function setCurrentPagePluginIndex(pluginKey: number, index: PluginIndex) {
  return getCurrentPagePluginIndexMap().set(pluginKey, index);
}

export function regenerateCurrentPagePluginIndexMap(pluginInstances: PluginInstance[]) {
  deletePagePluginInstanceIndexMap(pagesStore.currentPage.key);
  addPagePluginInstanceIndexMap(
    pagesStore.currentPage.key,
    pluginInstances.map(({ key }, index) => [key, index]),
  );
}
