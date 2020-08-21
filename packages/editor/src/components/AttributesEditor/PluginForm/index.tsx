import * as React from 'react';
import { materialsStore, pluginsStore, selectStore } from 'states';
import { useMemo } from 'react';
import { getPluginIndex } from 'utils';
import { PluginInstance } from 'types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { SchemaForm } from 'components/Form';

function IPluginForm() {
  const { pluginsInstances } = pluginsStore;
  const { pluginKey } = selectStore;

  const index = useMemo(() => getPluginIndex(pluginKey)!, [pluginKey, pluginsInstances]);

  const { data, plugin, key } = useMemo<PluginInstance>(() => {
    return pluginsInstances[index];
  }, [index, pluginsInstances]);

  const { dataForm } = useMemo(() => materialsStore.getPluginMeta(plugin), [plugin]);

  return (
    <>
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={toJS(data)}
          onChange={pluginsStore.setCurrentPluginInstanceData}
        />
      ) : null}
    </>
  );
}

export const PluginForm = observer(IPluginForm);
