import * as React from 'react';
import { ComponentInstance, Maybe, PageMeta } from 'types';

export interface HandlerParams {
  meta: PageMeta;
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

// function generateHandler(
//     actions: ActionInstance[],
//     trigger: ActionTrigger,
//     component: ComponentInstance,
//     hotArea?: HotArea,
// ): ActionHandler | undefined {
//     if (!actions || !actions.length) {
//         return undefined;
//     }
//
//     const iActions = actions.filter(a => a.trigger === trigger);
//     if (!iActions.length) {
//         return undefined;
//     }
//
//     return pipeActions(iActions, component, hotArea);
// }

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateHandlers(componentInstance: ComponentInstance): ActionHandlers {
  return {};
}
