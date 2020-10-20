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
    <div>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfCurrentHotArea(data, index)}
        />
      ))}
    </div>
  );
}

export const SortableHotAreaEventInstances = SortableContainer(ISortableHotAreaEventInstances);
