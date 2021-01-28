import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { EventInstance } from 'types';
import { eventStore } from 'states';
import { EventInstanceItem } from '../EventInstanceItem';

interface Props {
  events: EventInstance[];
}

function ISortableHotAreaEventInstances({ events }: Props) {
  return (
    <>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentHotArea(data, index)}
        />
      ))}
    </>
  );
}

export const SortableHotAreaEventInstances = SortableContainer(ISortableHotAreaEventInstances);
