import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { getMaterialsContainerMeta, EventEmitTypes, events } from 'libs';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { NotAvailable } from '../NotAvailable';

function IGlobalDataForm() {
  const { globalStyleForm } = getMaterialsContainerMeta()!;
  const { globalStyle, setGlobalStyle } = globalStore;

  const onChange = useCallback((v: object) => {
    setGlobalStyle(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!globalStyleForm) {
    return <NotAvailable />;
  }

  return (
    <div className="editor-prop-item editor-prop-edit-style">
      <SchemaForm form={globalStyleForm} data={globalStyle} onChange={onChange} submitProps />
    </div>
  );
}

export const GlobalStyleForm = observer(IGlobalDataForm);
