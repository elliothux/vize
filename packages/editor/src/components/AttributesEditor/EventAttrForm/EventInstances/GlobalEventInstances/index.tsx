import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore, globalStore } from 'states';
import { getMaterialsContainerMeta } from 'utils';
import { SortableContainerEventInstances } from './SortableContainerEventInstances';
import { Title } from '../Title';

function IGlobalEventInstances() {
  const { globalEvents } = globalStore;
  const container = getMaterialsContainerMeta()!;

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromGlobal(oldIndex, newIndex),
    [],
  );

  if (!globalEvents.length) {
    return null;
  }

  return (
    <div className="event_instances">
      <Title />
      <SortableContainerEventInstances
        helperClass="dragging-event-instance"
        events={globalEvents}
        container={container}
        lockAxis="y"
        onSortEnd={onSortEnd}
      />
    </div>
  );
}

export const GlobalEventInstances = observer(IGlobalEventInstances);
