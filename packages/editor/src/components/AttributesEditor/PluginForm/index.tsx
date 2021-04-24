import * as React from 'react';
import { pluginsStore, selectStore } from 'states';
import { useMemo } from 'react';
import { getCurrentPagePluginIndex } from 'libs';
import { PluginInstance } from 'types';
import { observer } from 'mobx-react';
import { SchemaForm } from 'widgets/Form';
import { getMaterialsPluginMeta } from 'runtime';

function IPluginForm() {
  const { pluginInstances } = pluginsStore;
  const { pluginKey } = selectStore;

  const index = useMemo(() => getCurrentPagePluginIndex(pluginKey)!, [pluginKey, pluginInstances]);

  const { data, plugin, key } = useMemo<PluginInstance>(() => {
    return pluginInstances[index];
  }, [index, pluginInstances]);

  const { dataForm } = useMemo(() => getMaterialsPluginMeta(plugin)!, [plugin]);

  return (
    <>
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={data}
          onChange={pluginsStore.setCurrentPluginInstanceData}
          submitProps
        />
      ) : null}
    </>
  );
}

export const PluginForm = observer(IPluginForm);
