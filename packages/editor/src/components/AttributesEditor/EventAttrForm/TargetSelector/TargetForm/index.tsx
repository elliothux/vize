import * as React from 'react';
import { EventTargetType, EventTriggerName, Maybe } from 'types';
import { ActionTargetSelector } from './ActionTargetSelector';
import { ComponentTargetSelector } from './ComponentTargetSelector';
import { PluginTargetSelector } from './PluginTargetSelector';
import { ContainerTargetSelector } from './ContainerTargetSelector';

interface FormProps {
  targetType: Maybe<EventTargetType>;
  trigger: EventTriggerName;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

export function TargetForm({ targetType, ...props }: FormProps) {
  switch (targetType) {
    case EventTargetType.ACTION:
      return React.createElement(ActionTargetSelector, props);
    case EventTargetType.COMPONENT:
      return React.createElement(ComponentTargetSelector, props);
    case EventTargetType.PLUGIN:
      return React.createElement(PluginTargetSelector, props);
    case EventTargetType.CONTAINER:
      return React.createElement(ContainerTargetSelector, props);
    default:
      return null;
  }
}
