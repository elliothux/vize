import * as React from 'react';
import { useCurrentPluginInstance, useCurrentPluginMeta } from 'hooks';
import { ActionInstanceItem } from './ActionInstanceItem';
import { observer } from 'mobx-react';
import { actionStore } from 'states';

function IPluginActionInstances() {
  const { actions } = useCurrentPluginInstance()!;
  const plugin = useCurrentPluginMeta()!;

  if (!actions.length) {
    return null;
  }

  return (
    <div className="action_instances">
      {actions.map((action, index) => (
        <ActionInstanceItem
          key={action.key}
          customEvents={plugin.emitEvents}
          actionInstance={action}
          onChangeData={data => actionStore.setActionsInstanceDataOfCurrentPluginInstance(data, index)}
        />
      ))}
    </div>
  );
}

export const PluginActionInstances = observer(IPluginActionInstances);
