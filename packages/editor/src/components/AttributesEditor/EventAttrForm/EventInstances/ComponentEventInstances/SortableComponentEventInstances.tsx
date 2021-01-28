import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { EventInstance, MaterialsComponentMeta } from 'types';
import { eventStore } from 'states';
import { EventInstanceItem } from '../EventInstanceItem';

interface Props {
  events: EventInstance[];
  component: MaterialsComponentMeta;
}

function ISortableComponentEventInstances({ events, component }: Props) {
  return (
    <>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          customEvents={component.emitEvents}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentComponentInstance(data, index)}
        />
      ))}
    </>
  );
}

export const SortableComponentEventInstances = SortableContainer(ISortableComponentEventInstances);
