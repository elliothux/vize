import * as React from 'react';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { EventInstanceItem } from './EventInstanceItem';
import { observer } from 'mobx-react';
import { eventStore } from 'states';

function IComponentEventInstances() {
  const { events } = useCurrentComponentInstance()!;
  const component = useCurrentComponentMeta()!;

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances">
      {events.map((action, index) => (
        <EventInstanceItem
          key={action.key}
          customEvents={component.emitEvents}
          actionInstance={action}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentComponentInstance(data, index)}
        />
      ))}
    </div>
  );
}

export const ComponentEventInstances = observer(IComponentEventInstances);
