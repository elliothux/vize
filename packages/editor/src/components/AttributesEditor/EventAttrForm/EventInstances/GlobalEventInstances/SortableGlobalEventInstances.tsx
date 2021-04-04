import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { EventInstance, MaterialsContainerMeta } from 'types';
import { eventStore } from 'states';
import { EventInstanceItem } from '../EventInstanceItem';

interface Props {
  events: EventInstance[];
  container: MaterialsContainerMeta;
}

function ISortableGlobalEventInstances({ events, container }: Props) {
  return (
    <>
      {events.map((event, index) => (
        <EventInstanceItem
          index={index}
          key={event.key}
          customEvents={container.globalEmitEvents}
          eventInstance={event}
          onChangeData={data => eventStore.setEventInstanceDataOfGlobal(data, index)}
        />
      ))}
    </>
  );
}

export const SortableGlobalEventInstances = SortableContainer(ISortableGlobalEventInstances);
