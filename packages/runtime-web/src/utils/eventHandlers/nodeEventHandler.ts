import {
  ComponentInstance,
  ComponentUniversalEventTrigger,
  EventInstance,
  EventTriggerName,
  HotArea,
  HotAreaUniversalEventTrigger,
  PageRouter,
} from '@vize/types/src';
import { EventHandler } from './types';
import { pipeEvents } from './utils';

export interface NodeEventHandlers {
  onInit?: EventHandler;
  onClick?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  onDoubleClick?: EventHandler;
  onLongPress?: EventHandler;
  onEnterView?: EventHandler;
  onLeaveView?: EventHandler;
}

function generateHandler(
  events: EventInstance[],
  trigger: EventTriggerName,
  instance: ComponentInstance | HotArea,
  router: PageRouter,
): EventHandler | undefined {
  const iEvents = events.filter(e => e.trigger.triggerName === trigger);
  if (!iEvents.length) {
    return undefined;
  }

  return pipeEvents(iEvents, instance, router);
}

export function generateNodeHandlers(
  events: EventInstance[],
  instance: ComponentInstance | HotArea,
  router: PageRouter,
): NodeEventHandlers {
  if (!events.length) {
    return {};
  }

  const handlers: NodeEventHandlers = {};
  const isHotArea = !!(instance as HotArea).position;
  const TriggerMap = isHotArea ? HotAreaUniversalEventTrigger : ComponentUniversalEventTrigger;

  if (!isHotArea) {
    const onInit = generateHandler(events, ComponentUniversalEventTrigger.INIT, instance, router);
    if (onInit) {
      handlers.onInit = onInit;
    }
  }

  const onClick = generateHandler(events, TriggerMap.CLICK, instance, router);
  if (onClick) {
    handlers.onClick = onClick;
  }

  const onMouseEnter = generateHandler(events, TriggerMap.MOUSE_ENTER, instance, router);
  if (onMouseEnter) {
    handlers.onMouseEnter = onMouseEnter;
  }

  const onMouseLeave = generateHandler(events, TriggerMap.MOUSE_LEAVE, instance, router);
  if (onMouseLeave) {
    handlers.onMouseLeave = onMouseLeave;
  }

  const onDoubleClick = generateHandler(events, TriggerMap.DOUBLE_CLICK, instance, router);
  if (onDoubleClick) {
    handlers.onDoubleClick = onDoubleClick;
  }

  const onLongPress = generateHandler(events, TriggerMap.LONG_PRESS, instance, router);
  if (onLongPress) {
    handlers.onLongPress = onLongPress;
  }

  const onEnterView = generateHandler(events, TriggerMap.ENTER_VIEW, instance, router);
  if (onEnterView) {
    handlers.onEnterView = onEnterView;
  }

  const onLeaveView = generateHandler(events, TriggerMap.LEAVE_VIEW, instance, router);
  if (onLeaveView) {
    handlers.onLeaveView = onLeaveView;
  }

  return handlers;
}
