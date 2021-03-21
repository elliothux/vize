import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { EventEmitTypes, events, getMaterialsContainerMeta } from 'utils';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { Collapse } from 'antd';
import { NotAvailable } from '../NotAvailable';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';

const { Panel } = Collapse;

function IGlobalDataForm() {
  const { t } = useTranslation();
  const { styleForm } = getMaterialsContainerMeta()!;
  const { globalStyle, setGlobalStyle } = globalStore;

  const onChange = useCallback((v: object) => {
    setGlobalStyle(v);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, []);

  if (!styleForm) {
    return <NotAvailable />;
  }

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['global']}
      className="editor-prop-item editor-prop-edit-style with-collapsed"
    >
      <Panel header={t('Global style of page')} key="global">
        <SchemaForm
          instanceKey={Number.MAX_SAFE_INTEGER - 2}
          form={styleForm}
          data={toJS(globalStyle)}
          onChange={onChange}
          submitProps
        />
      </Panel>
    </Collapse>
  );
}

export const GlobalStyleForm = observer(IGlobalDataForm);
