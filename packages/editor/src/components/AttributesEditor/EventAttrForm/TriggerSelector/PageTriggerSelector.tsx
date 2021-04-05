import * as React from 'react';
import { SelectType } from 'states';
import { EventTriggerType, PageUniversalEventTrigger } from 'types';
import { getMaterialsContainerMeta } from 'libs';
import { EventTriggerSelector } from './TriggerSelector';
import { Props } from './types';

const pageUniversalEventTriggers = Object.values(PageUniversalEventTrigger);

export function PageTriggerSelector({ trigger, setTrigger }: Props) {
  const { pageEmitEvents } = getMaterialsContainerMeta()!;
  return (
    <EventTriggerSelector
      type={SelectType.PAGE}
      triggerType={EventTriggerType.PageUniversalTrigger}
      trigger={trigger}
      setTrigger={setTrigger}
      customEvents={pageEmitEvents}
      universalEventTriggers={pageUniversalEventTriggers}
    />
  );
}
