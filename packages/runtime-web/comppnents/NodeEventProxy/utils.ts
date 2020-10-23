import * as React from 'react';
import {
  ComponentInstance,
  Maybe,
  GlobalMeta,
  EventInstance,
  HotArea,
  ComponentUniversalEventTrigger,
  EventTriggerName,
} from '../../types';

export interface HandlerParams {
  meta: GlobalMeta;
  global: object;
}

export type EventHandler = (originalEvent: Maybe<React.SyntheticEvent>, params: HandlerParams) => Promise<void>;

export interface EventHandlers {
  onInit?: EventHandler;
  onClick?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  onDoubleClick?: EventHandler;
  onLongPress?: EventHandler;
  onEnterView?: EventHandler;
  onLeaveView?: EventHandler;
}

function pipeActions(iActions: EventInstance[], instance: ComponentInstance | HotArea) {
  return undefined;
}

// TODO
function generateHandler(
  events: EventInstance[],
  trigger: EventTriggerName,
  instance: ComponentInstance | HotArea,
): EventHandler | undefined {
  if (!events || !events.length) {
    return undefined;
  }

  const iActions = events.filter(a => a.trigger.triggerName === trigger);
  if (!iActions.length) {
    return undefined;
  }

  return pipeActions(iActions, instance);
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateHandlers(events: EventInstance[], instance: ComponentInstance | HotArea): EventHandlers {
  const handlers: EventHandlers = {};

  const onInit = generateHandler(events, ComponentUniversalEventTrigger.INIT, instance);
  if (onInit) {
    handlers.onInit = onInit;
  }

  const onClick = generateHandler(events, ComponentUniversalEventTrigger.CLICK, instance);
  if (onClick) {
    handlers.onClick = onClick;
  }

  const onMouseEnter = generateHandler(events, ComponentUniversalEventTrigger.MOUSE_ENTER, instance);
  if (onMouseEnter) {
    handlers.onMouseEnter = onMouseEnter;
  }

  const onMouseLeave = generateHandler(events, ComponentUniversalEventTrigger.MOUSE_LEAVE, instance);
  if (onMouseLeave) {
    handlers.onMouseLeave = onMouseLeave;
  }

  const onDoubleClick = generateHandler(events, ComponentUniversalEventTrigger.DOUBLE_CLICK, instance);
  if (onDoubleClick) {
    handlers.onDoubleClick = onDoubleClick;
  }

  const onLongPress = generateHandler(events, ComponentUniversalEventTrigger.LONG_PRESS, instance);
  if (onLongPress) {
    handlers.onLongPress = onLongPress;
  }

  const onEnterView = generateHandler(events, ComponentUniversalEventTrigger.ENTER_VIEW, instance);
  if (onEnterView) {
    handlers.onEnterView = onEnterView;
  }

  const onLeaveView = generateHandler(events, ComponentUniversalEventTrigger.LEAVE_VIEW, instance);
  if (onLeaveView) {
    handlers.onLeaveView = onLeaveView;
  }

  return handlers;
}
