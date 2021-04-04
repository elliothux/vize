import { EventInstance, EventTriggerName, PageRouter, PluginInstance, PluginUniversalEventTrigger } from '@vize/types';
import { EventHandler } from './types';
import { pipeEvents } from './utils';

export interface PluginEventHandlers {
  [PluginUniversalEventTrigger.BEFORE_EXEC]?: EventHandler;
  [PluginUniversalEventTrigger.AFTER_EXEC]?: EventHandler;
}

function generateHandler(
  events: EventInstance[],
  trigger: EventTriggerName,
  instance: PluginInstance,
  router: PageRouter,
): EventHandler | undefined {
  const iEvents = events.filter(e => e.trigger.triggerName === trigger);
  if (!iEvents.length) {
    return undefined;
  }

  return pipeEvents(iEvents, instance, router);
}

export function generatePluginEventHandlers(
  events: EventInstance[],
  instance: PluginInstance,
  router: PageRouter,
): PluginEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: PluginEventHandlers = {};

  const beforeExec = generateHandler(events, PluginUniversalEventTrigger.BEFORE_EXEC, instance, router);
  if (beforeExec) {
    handlers[PluginUniversalEventTrigger.BEFORE_EXEC] = beforeExec;
  }

  const afterExec = generateHandler(events, PluginUniversalEventTrigger.AFTER_EXEC, instance, router);
  if (afterExec) {
    handlers[PluginUniversalEventTrigger.AFTER_EXEC] = afterExec;
  }

  return handlers;
}
