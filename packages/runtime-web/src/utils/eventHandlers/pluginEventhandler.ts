import { EventInstance, PageRouter, PluginUniversalEventTrigger } from '@vize/types';
import { EventHandler } from './types';
import { generateHandler } from './utils';

export interface PluginEventHandlers {
  [PluginUniversalEventTrigger.BEFORE_EXEC]?: EventHandler;
  [PluginUniversalEventTrigger.AFTER_EXEC]?: EventHandler;
}

export function generatePluginEventHandlers(events: EventInstance[], router: PageRouter): PluginEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: PluginEventHandlers = {};

  const beforeExec = generateHandler(events, PluginUniversalEventTrigger.BEFORE_EXEC, router);
  if (beforeExec) {
    handlers[PluginUniversalEventTrigger.BEFORE_EXEC] = beforeExec;
  }

  const afterExec = generateHandler(events, PluginUniversalEventTrigger.AFTER_EXEC, router);
  if (afterExec) {
    handlers[PluginUniversalEventTrigger.AFTER_EXEC] = afterExec;
  }

  return handlers;
}
