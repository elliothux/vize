import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { EventEmitTypes, events } from 'utils';
import { getMaterialsContainerMeta } from 'libs';
import { pagesStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { NotAvailable } from '../NotAvailable';

function IPageDataForm() {
  const { pageDataForm } = getMaterialsContainerMeta()!;
  const {
    currentPage: { data },
    setCurrentPageData,
  } = pagesStore;

  const onChange = useCallback((v: object) => {
    setCurrentPageData(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!pageDataForm) {
    return <NotAvailable />;
  }

  return (
    <div className="editor-prop-item editor-prop-edit-data">
      <SchemaForm form={pageDataForm} data={data} onChange={onChange} submitProps />
    </div>
  );
}

export const PageDataForm = observer(IPageDataForm);
