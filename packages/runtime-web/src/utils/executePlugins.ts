import { PluginInstanceDSL, MaterialsPlugin, PluginParams } from '../../types';
import { cancelCustomEvent, getMaterialsPlugin, onCustomEvent } from '../libs';

export function executePlugins(pluginInstances: PluginInstanceDSL[], win: Window = window) {
  return pluginInstances.forEach(({ key, plugin, data }) => {
    const pluginFunction: MaterialsPlugin = getMaterialsPlugin(plugin)!;
    const params: PluginParams = {
      pluginKey: key,
      data,
      on: (eventName, callback) => {
        onCustomEvent('plugin', key, eventName, callback);
      },
      cancel: (eventName, callback) => {
        cancelCustomEvent('plugin', key, eventName, callback);
      },
      emit: console.log,
    };
    return pluginFunction.bind(win)(params);
  });
}
