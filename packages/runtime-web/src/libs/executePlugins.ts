import { PluginInstanceDSL, MaterialsPlugin, PluginParams, PluginUniversalEventTrigger, GlobalMeta } from '../../types';
import { cancelCustomEvent, onCustomEvent } from './customEvents';
import { getMaterialsPlugin } from './materialsMap';
import { generatePluginHandlers } from '../utils/eventHandlers';

export function executePlugins(
  pluginInstances: PluginInstanceDSL[],
  meta: GlobalMeta,
  global: object,
  win: Window = window,
) {
  return pluginInstances.forEach(async instance => {
    const { key, plugin, data, events } = instance;
    const handlers = generatePluginHandlers(events, instance);

    if (handlers[PluginUniversalEventTrigger.BEFORE_EXEC]) {
      await handlers[PluginUniversalEventTrigger.BEFORE_EXEC]!(null, { global, meta });
    }

    const pluginFunction: MaterialsPlugin = getMaterialsPlugin(plugin)!;
    const params: PluginParams = {
      pluginKey: key,
      data,
      global,
      meta,
      on: (eventName, callback) => {
        onCustomEvent('plugin', key, eventName, callback);
      },
      cancel: (eventName, callback) => {
        cancelCustomEvent('plugin', key, eventName, callback);
      },
      emit: console.log,
    };

    try {
      await pluginFunction.bind(win)(params);
    } catch (e) {
      console.error(`Exec Plugin(key=${key}) throw error: `, e);
    }

    if (handlers[PluginUniversalEventTrigger.AFTER_EXEC]) {
      await handlers[PluginUniversalEventTrigger.AFTER_EXEC]!(null, { global, meta });
    }
  });
}
