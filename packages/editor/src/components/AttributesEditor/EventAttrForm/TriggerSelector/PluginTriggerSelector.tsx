import * as React from 'react';
import { useCurrentPluginMeta } from 'hooks';
import { SelectType } from 'states';
import { PluginUniversalEventTrigger } from 'types';
import { EventTriggerSelector } from './TriggerSelector';
import { Props } from './types';

const pluginUniversalEventTriggers = Object.values(PluginUniversalEventTrigger);

export function PluginTriggerSelector({ trigger, setTrigger }: Props) {
  const { emitEvents } = useCurrentPluginMeta()!;
  return (
    <EventTriggerSelector
      type={SelectType.PLUGIN}
      trigger={trigger}
      setTrigger={setTrigger}
      customEvents={emitEvents}
      universalEventTriggers={pluginUniversalEventTriggers}
    />
  );
}
