import * as React from 'react';
import { useCurrentPluginInstance, useCurrentPluginMeta } from 'hooks';
import { observer } from 'mobx-react';
import { Title } from '../Title';
import { SortablePluginEventInstances } from './SortablePluginEventInstances';
import { SortEnd } from 'react-sortable-hoc';
import { useCallback, useRef } from 'react';
import { eventStore } from 'states';

function IPluginEventInstances() {
  const { events } = useCurrentPluginInstance()!;
  const plugin = useCurrentPluginMeta()!;
  const ref = useRef<HTMLDivElement>(null);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: SortEnd) => eventStore.resortEventInstanceFromCurrentPluginInstance(oldIndex, newIndex),
    [],
  );

  if (!events.length) {
    return null;
  }

  return (
    <div className="event_instances">
      <Title />
      <SortablePluginEventInstances
        events={events}
        plugin={plugin}
        lockAxis="y"
        onSortEnd={onSortEnd}
        helperContainer={() => ref.current!}
      />
    </div>
  );
}

export const PluginEventInstances = observer(IPluginEventInstances);
