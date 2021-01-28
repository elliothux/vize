import * as React from 'react';
import { useCurrentHotArea } from 'hooks';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore } from 'states';
import { SortableHotAreaEventInstances } from './SortableHotAreaEventInstances';
import { Title } from '../Title';

function IHotAreaEventInstances() {
  const { events } = useCurrentHotArea()!;
  const ref = useRef<HTMLDivElement>(null);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromCurrentHotArea(oldIndex, newIndex),
    [],
  );

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances" ref={ref}>
      <Title />
      <SortableHotAreaEventInstances
        events={events}
        helperClass="dragging-event-instance"
        lockAxis="y"
        onSortEnd={onSortEnd}
        helperContainer={() => ref.current!}
      />
    </div>
  );
}

export const HotAreaEventInstances = observer(IHotAreaEventInstances);
