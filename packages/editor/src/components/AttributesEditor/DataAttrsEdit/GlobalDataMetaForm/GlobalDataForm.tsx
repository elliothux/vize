import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { EventEmitTypes, events, getMaterialsContainerMeta } from 'utils';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { NotAvailable } from '../../NotAvailable';

function IGlobalDataForm() {
  const { globalDataForm } = getMaterialsContainerMeta()!;
  const { globalData, setGlobalData } = globalStore;

  const onChange = useCallback((v: object) => {
    setGlobalData(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!globalDataForm) {
    return <NotAvailable />;
  }

  return <SchemaForm form={globalDataForm} data={globalData} onChange={onChange} submitProps />;
}

export const GlobalDataForm = observer(IGlobalDataForm);
