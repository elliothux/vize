import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { getMaterialsContainerMeta, EventEmitTypes, events } from 'libs';
import { pagesStore } from 'states';
import { i18n } from 'i18n';
import { Empty } from 'widgets/Empty';
import { SchemaForm } from 'widgets/Form';
import { MaterialsErrorBoundary } from 'components/MaterialsErrorBoundary';

function IPageStyleForm() {
  const { pageStyleForm } = getMaterialsContainerMeta()!;
  const {
    currentPage: { style },
    setCurrentPageStyle,
  } = pagesStore;

  const onChange = useCallback((v: object) => {
    setCurrentPageStyle(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!pageStyleForm) {
    return <Empty text={i18n.t('Not available')} />;
  }

  return (
    <div className="editor-prop-item editor-prop-edit-style">
      <MaterialsErrorBoundary type="container" isForm>
        <SchemaForm form={pageStyleForm} data={style} onChange={onChange} submitProps />
      </MaterialsErrorBoundary>
    </div>
  );
}

export const PageStyleForm = observer(IPageStyleForm);
