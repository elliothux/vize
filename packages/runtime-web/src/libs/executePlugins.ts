import {
  PluginInstanceDSL,
  MaterialsPlugin,
  PluginParams,
  PluginUniversalEventTrigger,
  GlobalMeta,
  PageRouter,
} from '@vize/types';
import { cancelCustomEvent, emitCustomEvent, onCustomEvent } from './customEvents';
import { getMaterialsPlugin } from './materialsMap';
import { generatePluginHandlers } from '../utils/eventHandlers';

export function executePlugins(
  pluginInstances: PluginInstanceDSL[],
  meta: GlobalMeta,
  global: object,
  router: PageRouter,
  win: Window = window,
) {
  return pluginInstances.forEach(async instance => {
    const { key, plugin, data, events } = instance;
    const handlers = generatePluginHandlers(events, instance, router);

    if (handlers[PluginUniversalEventTrigger.BEFORE_EXEC]) {
      await handlers[PluginUniversalEventTrigger.BEFORE_EXEC]!(null, { global, meta });
    }

    const pluginFunction: MaterialsPlugin = getMaterialsPlugin(plugin)!;
    const params: PluginParams = {
      pluginKey: key,
      data,
      global,
      meta,
      router,
      on: (eventName, callback) => {
        onCustomEvent('plugin', eventName, callback, key);
      },
      cancel: (eventName, callback) => {
        cancelCustomEvent('plugin', eventName, callback, key);
      },
      emit: eventName => {
        emitCustomEvent(instance.events, eventName, meta, global, router);
      },
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
