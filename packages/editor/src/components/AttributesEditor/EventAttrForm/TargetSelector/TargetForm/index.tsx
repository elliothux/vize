import * as React from 'react';
import { EventTargetType, EventTriggerName, Maybe } from 'types';
import { ActionTargetSelector } from './ActionTargetSelector';
import { ComponentTargetSelector } from './ComponentTargetSelector';
import { PluginTargetSelector } from './PluginTargetSelector';
import { GlobalTargetSelector } from './GlobalTargetSelector';
import { PageTargetSelector } from './PageTargetSelector';

interface FormProps {
  targetType: Maybe<EventTargetType>;
  trigger: EventTriggerName;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

export function TargetForm({ targetType, ...props }: FormProps) {
  switch (targetType) {
    case EventTargetType.Action:
      return React.createElement(ActionTargetSelector, props);
    case EventTargetType.Component:
      return React.createElement(ComponentTargetSelector, props);
    case EventTargetType.Plugin:
      return React.createElement(PluginTargetSelector, props);
    case EventTargetType.Global:
      return React.createElement(GlobalTargetSelector, props);
    case EventTargetType.Page:
      return React.createElement(PageTargetSelector, props);
    default:
      return null;
  }
}
