import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { pluginsStore } from 'states';
import { observer } from 'mobx-react';
import { SchemaForm } from 'widgets/Form';
import { useCurrentPluginInstance } from 'hooks';
import { getMaterialsPluginMeta } from 'runtime';
import { EventEmitTypes, events } from 'libs';

function IPluginForm() {
  const instance = useCurrentPluginInstance()!;
  const { data, plugin, key } = instance;

  const { dataForm } = useMemo(() => getMaterialsPluginMeta(plugin)!, [plugin]);

  const onChange = useCallback((data: object) => {
    pluginsStore.setCurrentPluginInstanceData(data);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  return (
    <div className="editor-prop-item editor-prop-edit-data">
      {dataForm ? <SchemaForm instanceKey={key} form={dataForm} data={data} onChange={onChange} submitProps /> : null}
    </div>
  );
}

export const PluginDataForm = observer(IPluginForm);
