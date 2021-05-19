import { EventInstance, PageRouter, GlobalUniversalEventTrigger } from '@vize/types';
import { EventHandler } from './types';
import { generateHandler } from './utils';

export interface GlobalEventHandlers {
  [GlobalUniversalEventTrigger.INIT]?: EventHandler;
}

export function generateGlobalEventHandlers(events: EventInstance[], router: PageRouter): GlobalEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: GlobalEventHandlers = {};

  const init = generateHandler(events, GlobalUniversalEventTrigger.INIT, router);
  if (init) {
    handlers[GlobalUniversalEventTrigger.INIT] = init;
  }

  return handlers;
}
