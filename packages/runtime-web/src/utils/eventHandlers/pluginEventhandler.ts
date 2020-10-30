import { EventInstance, EventTriggerName, PluginInstance, PluginUniversalEventTrigger } from '../../../types';
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
): EventHandler | undefined {
  const iEvents = events.filter(e => e.trigger.triggerName === trigger);
  if (!iEvents.length) {
    return undefined;
  }

  return pipeEvents(iEvents, instance);
}

export function generatePluginHandlers(events: EventInstance[], instance: PluginInstance): PluginEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: PluginEventHandlers = {};

  const beforeExec = generateHandler(events, PluginUniversalEventTrigger.BEFORE_EXEC, instance);
  if (beforeExec) {
    handlers[PluginUniversalEventTrigger.BEFORE_EXEC] = beforeExec;
  }

  const afterExec = generateHandler(events, PluginUniversalEventTrigger.AFTER_EXEC, instance);
  if (afterExec) {
    handlers[PluginUniversalEventTrigger.AFTER_EXEC] = afterExec;
  }

  return handlers;
}
