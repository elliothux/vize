import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore, globalStore } from 'states';
import { getMaterialsContainerMeta } from 'utils';
import { SortableContainerEventInstances } from './SortableContainerEventInstances';
import { Title } from '../Title';

function IContainerEventInstances() {
  const { containerEvents } = globalStore;
  const container = getMaterialsContainerMeta()!;

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromContainer(oldIndex, newIndex),
    [],
  );

  if (!containerEvents.length) {
    return null;
  }

  return (
    <div className="event_instances">
      <Title />
      <SortableContainerEventInstances
        helperClass="dragging-event-instance"
        events={containerEvents}
        container={container}
        lockAxis="y"
        onSortEnd={onSortEnd}
      />
    </div>
  );
}

export const ContainerEventInstances = observer(IContainerEventInstances);
