import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { EventInstance, MaterialsPluginMeta } from '@vize/types';
import { eventStore } from 'states';
import { EventInstanceItem } from '../EventInstanceItem';

interface Props {
  events: EventInstance[];
  plugin: MaterialsPluginMeta;
}

function ISortablePluginEventInstances({ events, plugin }: Props) {
  return (
    <>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          customEvents={plugin.emitEvents}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentPluginInstance(data, index)}
        />
      ))}
    </>
  );
}

export const SortablePluginEventInstances = SortableContainer(ISortablePluginEventInstances);
