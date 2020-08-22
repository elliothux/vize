import * as React from 'react';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { ActionInstanceItem } from './ActionInstanceItem';
import { observer } from 'mobx-react';
import { actionStore } from 'states';

function IComponentActionInstances() {
  const { actions } = useCurrentComponentInstance()!;
  const component = useCurrentComponentMeta()!;

  if (!actions.length) {
    return null;
  }

  return (
    <div className="action_instances">
      {actions.map((action, index) => (
        <ActionInstanceItem
          key={action.key}
          customEvents={component.emitEvents}
          actionInstance={action}
          onChangeData={data => actionStore.setActionsInstanceDataOfCurrentComponentInstance(data, index)}
        />
      ))}
    </div>
  );
}

export const ComponentActionInstances = observer(IComponentActionInstances);
