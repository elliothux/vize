import { useMemo } from 'react';
import { MaterialsPluginMeta, Maybe, PluginInstance } from 'types';
import { pluginsStore, selectStore, SelectType } from 'states';
import { getCurrentPagePluginIndex, isNumber } from 'utils';
import { getMaterialsPluginMeta } from 'runtime';

export function usePluginInstance(key: number): Maybe<PluginInstance> {
  const { pluginInstances } = pluginsStore;
  const index = useMemo(() => getCurrentPagePluginIndex(key), [key, pluginInstances]);

  if (!isNumber(index)) {
    return null;
  }

  return pluginInstances[index!];
}

export function usePluginMetaById(id: string): Maybe<MaterialsPluginMeta> {
  return getMaterialsPluginMeta(id);
}

export function usePluginMeta(key: number): Maybe<MaterialsPluginMeta> {
  const instance = usePluginInstance(key);
  return usePluginMetaById(instance?.plugin || '');
}

export function useCurrentPluginInstance(): Maybe<PluginInstance> {
  const { selectType, pluginKey } = selectStore;
  const isPluginSelected = selectType === SelectType.PLUGIN;
  const instance = usePluginInstance(pluginKey);

  return isPluginSelected ? instance : null;
}

export function useCurrentPluginMeta(): Maybe<MaterialsPluginMeta> {
  const instance = useCurrentPluginInstance();
  return usePluginMeta(instance?.key || -1);
}
