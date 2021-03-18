import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { EventEmitTypes, events, getMaterialsContainerMeta } from 'utils';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { NotAvailable } from '../NotAvailable';

function IGlobalDataForm() {
  const { dataForm } = getMaterialsContainerMeta()!;
  const { globalProps, setGlobalProps } = globalStore;

  const onChange = useCallback((v: object) => {
    setGlobalProps(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!dataForm) {
    return <NotAvailable />;
  }

  return (
    <SchemaForm
      instanceKey={Number.MAX_SAFE_INTEGER - 1}
      form={dataForm}
      data={globalProps}
      onChange={onChange}
      submitProps
    />
  );
}

export const GlobalDataForm = observer(IGlobalDataForm);
