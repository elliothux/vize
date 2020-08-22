import { useMemo } from 'react';
import { MaterialsPluginMeta, Maybe, PluginInstance } from 'types';
import { materialsStore, pluginsStore, selectStore, SelectType } from 'states';
import { getPluginIndex, isNumber } from 'utils';

export function usePluginInstance(key: number): Maybe<PluginInstance> {
  const { pluginsInstances } = pluginsStore;
  const index = useMemo(() => getPluginIndex(key), [key, pluginsInstances]);

  if (!isNumber(index)) {
    return null;
  }

  return pluginsInstances[index!];
}

export function usePluginMetaById(id: string): Maybe<MaterialsPluginMeta> {
  return materialsStore.getPluginMeta(id);
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
