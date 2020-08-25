import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { EventInstance, MaterialsPluginMeta } from 'types';
import { eventStore } from 'states';
import { EventInstanceItem } from '../EventInstanceItem';

interface Props {
  events: EventInstance[];
  plugin: MaterialsPluginMeta;
}

function ISortablePluginEventInstances({ events, plugin }: Props) {
  return (
    <div>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          customEvents={plugin.emitEvents}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentPluginInstance(data, index)}
        />
      ))}
    </div>
  );
}

export const SortablePluginEventInstances = SortableContainer(ISortablePluginEventInstances);
