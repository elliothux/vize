import * as React from 'react';
import { useCurrentPluginInstance, useCurrentPluginMeta } from 'hooks';
import { EventInstanceItem } from './EventInstanceItem';
import { observer } from 'mobx-react';
import { eventStore } from 'states';

function IPluginEventInstances() {
  const { events } = useCurrentPluginInstance()!;
  const plugin = useCurrentPluginMeta()!;

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances">
      {events.map((action, index) => (
        <EventInstanceItem
          index={index}
          key={action.key}
          customEvents={plugin.emitEvents}
          actionInstance={action}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentPluginInstance(data, index)}
        />
      ))}
    </div>
  );
}

export const PluginEventInstances = observer(IPluginEventInstances);
