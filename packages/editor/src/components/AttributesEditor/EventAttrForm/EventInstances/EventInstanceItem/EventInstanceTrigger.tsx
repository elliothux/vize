import * as React from 'react';
import { useMemo } from 'react';
import { EventTargetType, EventTrigger, EventTarget, MaterialsCustomEvent } from 'types';
import { getTriggerDisplayName } from './utils';

interface Props {
  trigger: EventTrigger;
  target: EventTarget;
  customEvents?: MaterialsCustomEvent[];
}

export function EventInstanceTrigger({ trigger, target, customEvents }: Props) {
  const [triggerDisplayName, TriggerIcon] = useMemo(() => getTriggerDisplayName(trigger, customEvents), []);

  return (
    <p className="event_instance_trigger">
      <TriggerIcon />当 <span>{triggerDisplayName}</span> 时 {getTargetTypeDesc(target.type)}
    </p>
  );
}

function getTargetTypeDesc(type: EventTargetType) {
  const descMap = {
    [EventTargetType.ACTION]: '执行动作',
    [EventTargetType.PLUGIN]: '触发插件',
    [EventTargetType.COMPONENT]: '触发组件',
  };
  return descMap[type];
}
