import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { getMaterialsContainerMeta, EventEmitTypes, events } from 'libs';
import { globalStore } from 'states';
import { i18n } from '@vize/i18n';
import { Empty } from 'widgets/Empty';
import { SchemaForm } from 'widgets/Form';
import { MaterialsErrorBoundary } from 'components/MaterialsErrorBoundary';

function IGlobalDataForm() {
  const { globalDataForm } = getMaterialsContainerMeta()!;
  const { globalData, setGlobalData } = globalStore;

  const onChange = useCallback((v: object) => {
    setGlobalData(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!globalDataForm) {
    return <Empty text={i18n.t('Not available')} />;
  }

  return (
    <MaterialsErrorBoundary type="container" isForm>
      <SchemaForm form={globalDataForm} data={globalData} onChange={onChange} submitProps />
    </MaterialsErrorBoundary>
  );
}

export const GlobalDataForm = observer(IGlobalDataForm);
