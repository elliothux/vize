import * as React from 'react';
import { SelectType } from 'states';
import { HotAreaUniversalEventTrigger, EventTriggerType } from 'types';
import { EventTriggerSelector } from './TriggerSelector';
import { Props } from './types';

const hotAreaUniversalEventTrigger = Object.values(HotAreaUniversalEventTrigger);

export function HotAreaTriggerSelector({ trigger, setTrigger }: Props) {
  return (
    <EventTriggerSelector
      type={SelectType.COMPONENT}
      triggerType={EventTriggerType.HotAreaUniversalTrigger}
      trigger={trigger}
      setTrigger={setTrigger}
      universalEventTriggers={hotAreaUniversalEventTrigger}
    />
  );
}
