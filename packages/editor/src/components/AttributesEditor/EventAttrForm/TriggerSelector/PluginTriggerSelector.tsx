import * as React from 'react';
import { useCurrentPluginMeta } from 'hooks';
import { SelectType } from 'states';
import { EventTriggerType, PluginUniversalEventTrigger } from '@vize/types';
import { EventTriggerSelector } from './TriggerSelector';
import { Props } from './types';

const pluginUniversalEventTriggers = Object.values(PluginUniversalEventTrigger);

export function PluginTriggerSelector({ trigger, setTrigger }: Props) {
  const { emitEvents } = useCurrentPluginMeta()!;
  return (
    <EventTriggerSelector
      type={SelectType.PLUGIN}
      triggerType={EventTriggerType.PluginUniversalTrigger}
      trigger={trigger}
      setTrigger={setTrigger}
      customEvents={emitEvents}
      universalEventTriggers={pluginUniversalEventTriggers}
    />
  );
}
