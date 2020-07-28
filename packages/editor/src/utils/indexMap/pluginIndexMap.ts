import { PluginInstance, Maybe } from 'types';

type PluginIndex = number;

export const pluginIndexMap = new Map<number, PluginIndex>();

export function addPluginIndexMap(pluginInstances: PluginInstance[]) {
    return pluginInstances.forEach(({ key }, index) => pluginIndexMap.set(key, index));
}

export function getPluginIndex(pluginKey: number): Maybe<PluginIndex> {
    return pluginIndexMap.get(pluginKey);
}

export function setPluginIndex(pluginKey: number, index: PluginIndex) {
    return pluginIndexMap.set(pluginKey, index);
}

export function deletePluginIndex(pluginKey: number): PluginIndex {
    const pluginIndex = pluginIndexMap.get(pluginKey)!;
    pluginIndexMap.delete(pluginKey);
    return pluginIndex;
}

export function regeneratePluginIndexMap(pluginInstances: PluginInstance[]) {
    pluginIndexMap.clear();
    return addPluginIndexMap(pluginInstances);
}
