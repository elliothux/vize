import { EventInstance, PageRouter, PageUniversalEventTrigger } from '@vize/types';
import { EventHandler } from './types';
import { generateHandler } from './utils';

export interface PageEventHandlers {
  [PageUniversalEventTrigger.AFTER_ENTER_PAGE]?: EventHandler;
  [PageUniversalEventTrigger.BEFORE_LEAVE_PAGE]?: EventHandler;
}

export function generatePageEventHandlers(events: EventInstance[], router: PageRouter): PageEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: PageEventHandlers = {};

  const afterEnter = generateHandler(events, PageUniversalEventTrigger.AFTER_ENTER_PAGE, router);
  if (afterEnter) {
    handlers[PageUniversalEventTrigger.AFTER_ENTER_PAGE] = afterEnter;
  }

  const beforeLeave = generateHandler(events, PageUniversalEventTrigger.BEFORE_LEAVE_PAGE, router);
  if (beforeLeave) {
    handlers[PageUniversalEventTrigger.BEFORE_LEAVE_PAGE] = beforeLeave;
  }

  return handlers;
}
