import { PluginInstanceDSL, MaterialsPlugin } from '../../types';

export function executePlugins(
  pluginInstances: PluginInstanceDSL[],
  pluginsMaterialMap: { [id: string]: MaterialsPlugin },
) {
  return pluginInstances.forEach(({ key, plugin, data }) => {
    const pluginFunction: MaterialsPlugin = pluginsMaterialMap[plugin];
    return pluginFunction({ pluginKey: key, data });
  });
}
