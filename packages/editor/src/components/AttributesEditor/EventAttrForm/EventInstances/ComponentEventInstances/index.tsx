import * as React from 'react';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { SortableComponentEventInstances } from './SortableComponentEventInstances';
import { Title } from '../Title';
import { SortEnd } from 'react-sortable-hoc';
import { eventStore } from 'states';

function IComponentEventInstances() {
  const { events } = useCurrentComponentInstance()!;
  const component = useCurrentComponentMeta()!;
  const ref = useRef<HTMLDivElement>(null);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromCurrentComponentInstance(oldIndex, newIndex),
    [],
  );

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances" ref={ref}>
      <Title />
      <SortableComponentEventInstances
        events={events}
        component={component}
        lockAxis="y"
        onSortEnd={onSortEnd}
        helperContainer={() => ref.current!}
      />
    </div>
  );
}

export const ComponentEventInstances = observer(IComponentEventInstances);
