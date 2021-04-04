import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore, pagesStore } from 'states';
import { getMaterialsContainerMeta } from 'libs';
import { SortablePageEventInstances } from './SortablePageEventInstances';
import { Title } from '../Title';

function IPageEventInstances() {
  const {
    currentPage: { events },
  } = pagesStore;
  const container = getMaterialsContainerMeta()!;

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromGlobal(oldIndex, newIndex),
    [],
  );

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances">
      <Title />
      <SortablePageEventInstances
        helperClass="dragging-event-instance"
        events={events}
        container={container}
        lockAxis="y"
        onSortEnd={onSortEnd}
      />
    </div>
  );
}

export const PageEventInstances = observer(IPageEventInstances);
