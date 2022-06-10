import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { pluginsStore } from 'states';
import { observer } from 'mobx-react';
import { SchemaForm } from 'widgets/Form';
import { useCurrentPluginInstance } from 'hooks';
import { getMaterialsPluginMeta } from '@vize/runtime-web';
import { EventEmitTypes, events } from 'libs';
import { MaterialsErrorBoundary } from 'components/MaterialsErrorBoundary';

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
      {dataForm ? (
        <MaterialsErrorBoundary type="plugin" identityName={plugin} isForm>
          <SchemaForm instanceKey={key} form={dataForm} data={data} onChange={onChange} submitProps />{' '}
        </MaterialsErrorBoundary>
      ) : null}
    </div>
  );
}

export const PluginDataForm = observer(IPluginForm);
