import * as React from 'react';
import { SelectType } from 'states';
import { EventTriggerType, GlobalUniversalEventTrigger } from 'types';
import { getMaterialsContainerMeta } from 'libs';
import { EventTriggerSelector } from './TriggerSelector';
import { Props } from './types';

const globalUniversalEventTriggers = Object.values(GlobalUniversalEventTrigger);

export function GlobalTriggerSelector({ trigger, setTrigger }: Props) {
  const { globalEmitEvents } = getMaterialsContainerMeta()!;
  return (
    <EventTriggerSelector
      type={SelectType.GLOBAL}
      triggerType={EventTriggerType.GlobalUniversalTrigger}
      trigger={trigger}
      setTrigger={setTrigger}
      customEvents={globalEmitEvents}
      universalEventTriggers={globalUniversalEventTriggers}
    />
  );
}
