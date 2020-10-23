import * as React from 'react';
import { timeout } from 'promise-timeout';
import {
  ComponentInstance,
  Maybe,
  GlobalMeta,
  EventInstance,
  HotArea,
  ComponentUniversalEventTrigger,
  EventTriggerName,
  EventTargetType,
  MaterialsAction,
  FirstParameter,
  HotAreaUniversalEventTrigger,
} from '../../../types';
import { getMaterialsAction, getMaterialsActionMeta } from '../../libs';

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

const DEFAULT_MAX_TIMEOUT = 10 * 1000;

function pipeEvents(events: EventInstance[], instance: ComponentInstance | HotArea): EventHandler {
  return async (originalEvent: Maybe<React.SyntheticEvent>, { meta, global }: HandlerParams) => {
    for (const event of events) {
      const { target, data } = event;
      switch (target.type) {
        case EventTargetType.ACTION: {
          const { maxTimeout = DEFAULT_MAX_TIMEOUT } = getMaterialsActionMeta(target.id)!;
          const action = getMaterialsAction(target.id)!;
          const params: FirstParameter<MaterialsAction> = { data: data!, global, meta };

          try {
            if (maxTimeout === 'infinity') {
              await action(params);
            } else {
              const exec = action(params);
              if ((exec as unknown) instanceof Promise) {
                await timeoutPromise((exec as unknown) as Promise<void>, maxTimeout);
              }
            }
          } catch (e) {
            console.error('Action throw error: ', e);
          }
        }
        case EventTargetType.COMPONENT: {
          // TODO
          break;
        }
        case EventTargetType.PLUGIN: {
          // TODO
          break;
        }
      }
    }
  };
}

function generateHandler(
  events: EventInstance[],
  trigger: EventTriggerName,
  instance: ComponentInstance | HotArea,
): EventHandler | undefined {
  if (!events || !events.length) {
    return undefined;
  }

  const iEvents = events.filter(a => a.trigger.triggerName === trigger);
  if (!iEvents.length) {
    return undefined;
  }

  return pipeEvents(iEvents, instance);
}

export function generateHandlers(events: EventInstance[], instance: ComponentInstance | HotArea): EventHandlers {
  const handlers: EventHandlers = {};
  const isHotArea = !!(instance as HotArea).position;
  const TriggerMap = isHotArea ? ComponentUniversalEventTrigger : HotAreaUniversalEventTrigger;

  if (!isHotArea) {
    const onInit = generateHandler(events, ComponentUniversalEventTrigger.INIT, instance);
    if (onInit) {
      handlers.onInit = onInit;
    }
  }

  const onClick = generateHandler(events, TriggerMap.CLICK, instance);
  if (onClick) {
    handlers.onClick = onClick;
  }

  const onMouseEnter = generateHandler(events, TriggerMap.MOUSE_ENTER, instance);
  if (onMouseEnter) {
    handlers.onMouseEnter = onMouseEnter;
  }

  const onMouseLeave = generateHandler(events, TriggerMap.MOUSE_LEAVE, instance);
  if (onMouseLeave) {
    handlers.onMouseLeave = onMouseLeave;
  }

  const onDoubleClick = generateHandler(events, TriggerMap.DOUBLE_CLICK, instance);
  if (onDoubleClick) {
    handlers.onDoubleClick = onDoubleClick;
  }

  const onLongPress = generateHandler(events, TriggerMap.LONG_PRESS, instance);
  if (onLongPress) {
    handlers.onLongPress = onLongPress;
  }

  const onEnterView = generateHandler(events, TriggerMap.ENTER_VIEW, instance);
  if (onEnterView) {
    handlers.onEnterView = onEnterView;
  }

  const onLeaveView = generateHandler(events, TriggerMap.LEAVE_VIEW, instance);
  if (onLeaveView) {
    handlers.onLeaveView = onLeaveView;
  }

  return handlers;
}

function timeoutPromise<T>(p: Promise<T>, t: number): Promise<T> {
  return timeout(p, t);
}
