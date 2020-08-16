import { useMemo } from 'react';
import { MaterialsPluginMeta, Maybe, PluginInstance } from 'types';
import { materialsStore, pluginsStore, selectStore, SelectType } from 'states';
import { getPluginIndex } from 'utils';

export function useCurrentPluginInstance(): Maybe<PluginInstance> {
  const { selectType, pluginKey } = selectStore;
  const { pluginsInstances } = pluginsStore;
  const isPluginSelected = selectType === SelectType.PLUGIN;

  const index = useMemo(() => {
    if (!isPluginSelected) {
      return -1;
    }
    return getPluginIndex(pluginKey)!;
  }, [pluginKey, pluginsInstances]);

  if (!isPluginSelected) {
    return null;
  }

  return pluginsInstances[index];
}

export function useCurrentPluginMeta(): Maybe<MaterialsPluginMeta> {
  const instance = useCurrentPluginInstance();

  if (!instance) {
    return null;
  }

  return materialsStore.getPluginMeta(instance.plugin);
}
