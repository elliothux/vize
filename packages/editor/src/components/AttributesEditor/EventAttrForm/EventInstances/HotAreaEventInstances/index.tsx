import * as React from 'react';
import { useCurrentHotArea } from 'hooks';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { SortableHotAreaEventInstances } from './SortableHotAreaEventInstances';
import { Title } from '../Title';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore } from 'states';

function IHotAreaEventInstances() {
  const { events } = useCurrentHotArea()!;
  const ref = useRef<HTMLDivElement>(null);

  console.log(events);
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
        lockAxis="y"
        onSortEnd={onSortEnd}
        helperContainer={() => ref.current!}
      />
    </div>
  );
}

export const HotAreaEventInstances = observer(IHotAreaEventInstances);
