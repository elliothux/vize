import * as React from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalMetaForm } from './GlobalMetaForm';
import { GlobalDataForm } from './GlobalDataForm';
import { GlobalEditInfoForm } from './GlobalEditInfoForm';

const { Panel } = Collapse;

export function GlobalDataMetaForm() {
  const { t } = useTranslation();

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['meta', 'global']}
      className="editor-prop-item editor-prop-edit-data global with-collapsed"
    >
      <Panel header={t('Edit info of page')} key="edit">
        <GlobalEditInfoForm />
      </Panel>
      <Panel header={t('Meta info of page')} key="meta">
        <GlobalMetaForm />
      </Panel>
      <Panel header={t('Global info of container')} key="global">
        <GlobalDataForm />
      </Panel>
    </Collapse>
  );
}
