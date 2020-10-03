import * as React from 'react';
import {
  ComponentInstance,
  Maybe,
  GlobalMeta,
  EventInstance,
  HotArea,
  ComponentUniversalEventTriggers,
  EventTriggerName,
} from 'types';

export interface HandlerParams {
  meta: GlobalMeta;
  global: object;
}

export type ActionHandler = (originalEvent: Maybe<React.SyntheticEvent>, params: HandlerParams) => Promise<void>;

export interface ActionHandlers {
  onInit?: ActionHandler;
  onClick?: ActionHandler;
  onMouseEnter?: ActionHandler;
  onMouseLeave?: ActionHandler;
  onDoubleClick?: ActionHandler;
  onLongPress?: ActionHandler;
  onEnterView?: ActionHandler;
  onLeaveView?: ActionHandler;
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateHandler(
  actions: EventInstance[],
  trigger: EventTriggerName,
  component: ComponentInstance,
  hotArea?: HotArea,
): ActionHandler | undefined {
  if (!actions || !actions.length) {
    return undefined;
  }

  const iActions = actions.filter(a => a.trigger.triggerName === trigger);
  if (!iActions.length) {
    return undefined;
  }
  console.log(component, hotArea);
  // return pipeActions(iActions, component, hotArea);
  return undefined;
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateHandlers(
  actions: EventInstance[],
  component: ComponentInstance,
  hotArea?: HotArea,
): ActionHandlers {
  const handlers: ActionHandlers = {};

  const onInit = generateHandler(actions, ComponentUniversalEventTriggers.INIT, component, hotArea);
  if (onInit) {
    handlers.onInit = onInit;
  }

  const onClick = generateHandler(actions, ComponentUniversalEventTriggers.CLICK, component, hotArea);
  if (onClick) {
    handlers.onClick = onClick;
  }

  const onMouseEnter = generateHandler(actions, ComponentUniversalEventTriggers.MOUSE_ENTER, component, hotArea);
  if (onMouseEnter) {
    handlers.onMouseEnter = onMouseEnter;
  }

  const onMouseLeave = generateHandler(actions, ComponentUniversalEventTriggers.MOUSE_LEAVE, component, hotArea);
  if (onMouseLeave) {
    handlers.onMouseLeave = onMouseLeave;
  }

  const onDoubleClick = generateHandler(actions, ComponentUniversalEventTriggers.DOUBLE_CLICK, component, hotArea);
  if (onDoubleClick) {
    handlers.onDoubleClick = onDoubleClick;
  }

  const onLongPress = generateHandler(actions, ComponentUniversalEventTriggers.LONG_PRESS, component, hotArea);
  if (onLongPress) {
    handlers.onLongPress = onLongPress;
  }

  const onEnterView = generateHandler(actions, ComponentUniversalEventTriggers.ENTER_VIEW, component, hotArea);
  if (onEnterView) {
    handlers.onEnterView = onEnterView;
  }

  const onLeaveView = generateHandler(actions, ComponentUniversalEventTriggers.LEAVE_VIEW, component, hotArea);
  if (onLeaveView) {
    handlers.onLeaveView = onLeaveView;
  }

  return handlers;
}
