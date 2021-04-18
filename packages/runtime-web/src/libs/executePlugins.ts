import {
  PluginInstanceDSL,
  MaterialsPlugin,
  PluginParams,
  PluginUniversalEventTrigger,
  GlobalMeta,
  PageRouter,
} from '../../types';
import { cancelCustomEvent, emitCustomEvent, onCustomEvent } from './customEvents';
import { getMaterialsPlugin } from './materialsMap';
import { generatePluginEventHandlers } from '../utils/eventHandlers';

export interface ExecutePluginsParams {
  pluginInstances: PluginInstanceDSL[];
  meta: GlobalMeta;
  globalData: object;
  globalStyle: object;
  pageData: object;
  pageStyle: object;
  router: PageRouter;
  win?: Window;
}

export function executePlugins({
  pluginInstances,
  meta,
  globalData,
  globalStyle,
  pageData,
  pageStyle,
  router,
  win = window,
}: ExecutePluginsParams) {
  return pluginInstances.forEach(async instance => {
    const { key, plugin, data, events } = instance;
    const handlers = generatePluginEventHandlers(events, router);

    if (handlers[PluginUniversalEventTrigger.BEFORE_EXEC]) {
      await handlers[PluginUniversalEventTrigger.BEFORE_EXEC]!(null, {
        globalData,
        globalStyle,
        pageData,
        pageStyle,
        meta,
      });
    }

    const dataParams = { globalData, globalStyle, pageData, pageStyle, meta, router };
    const pluginFunction: MaterialsPlugin = getMaterialsPlugin(plugin)!;
    const params: PluginParams = {
      pluginKey: key,
      data,
      ...dataParams,
      on: (eventName, callback) => {
        onCustomEvent('plugin', eventName, callback, key);
      },
      cancel: (eventName, callback) => {
        cancelCustomEvent('plugin', eventName, callback, key);
      },
      emit: eventName => {
        emitCustomEvent({
          events,
          eventName,
          ...dataParams,
        });
      },
    };

    try {
      await pluginFunction.bind(win)(params);
    } catch (e) {
      console.error(`Exec Plugin(key=${key}) throw error: `, e);
    }

    if (handlers[PluginUniversalEventTrigger.AFTER_EXEC]) {
      await handlers[PluginUniversalEventTrigger.AFTER_EXEC]!(null, dataParams);
    }
  });
}
