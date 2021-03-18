import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';
import { GlobalDataForm } from './GlobalDataForm';
import { NotAvailable } from '../NotAvailable';
import { GlobalMetaForm } from './GlobalMetaForm';

const { Panel } = Collapse;

interface Props {
  selectType: SelectType;
}

function IDataAttrsEdit({ selectType }: Props) {
  const { t } = useTranslation();

  if (selectType === SelectType.COMPONENT) {
    return <ComponentDataForm />;
  }

  if (selectType === SelectType.PLUGIN) {
    return <PluginDataForm />;
  }

  if (selectType === SelectType.GLOBAL) {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['meta', 'global']}
        className="editor-prop-item editor-prop-edit-data global with-collapsed"
      >
        <Panel header={t('Meta info of page')} key="meta">
          <GlobalMetaForm />
        </Panel>
        <Panel header={t('Global info of container')} key="global">
          <GlobalDataForm />
        </Panel>
      </Collapse>
    );
  }

  return <NotAvailable />;
}

export const DataAttrsEdit = IDataAttrsEdit;
