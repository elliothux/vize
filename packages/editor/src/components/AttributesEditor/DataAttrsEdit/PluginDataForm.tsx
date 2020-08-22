import * as React from 'react';
import { materialsStore, pluginsStore } from 'states';
import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { SchemaForm } from 'components/Form';
import { useCurrentPluginInstance } from 'hooks';

function IPluginForm() {
  const instance = useCurrentPluginInstance()!;
  const { data, plugin, key } = instance;

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

export const PluginDataForm = observer(IPluginForm);
