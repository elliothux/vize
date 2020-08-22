import * as React from 'react';
import { materialsStore, pluginsStore, selectStore } from 'states';
import { useMemo } from 'react';
import { getCurrentPagePluginIndex } from 'utils';
import { PluginInstance } from 'types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { SchemaForm } from 'components/Form';

function IPluginForm() {
  const { pluginInstances } = pluginsStore;
  const { pluginKey } = selectStore;

  const index = useMemo(() => getCurrentPagePluginIndex(pluginKey)!, [pluginKey, pluginInstances]);

  const { data, plugin, key } = useMemo<PluginInstance>(() => {
    return pluginInstances[index];
  }, [index, pluginInstances]);

  const { dataForm } = useMemo(() => materialsStore.getPluginMeta(plugin), [plugin]);

  return (
    <>
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={toJS(data)}
          onChange={pluginsStore.setCurrentPluginInstanceData}
          submitProps
        />
      ) : null}
    </>
  );
}

export const PluginForm = observer(IPluginForm);
