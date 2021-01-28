import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';
import { GlobalDataForm } from './GlobalDataForm';
import { NotAvailable } from '../NotAvailable';

interface Props {
  selectType: SelectType;
}

function IDataAttrsEdit({ selectType }: Props) {
  if (selectType === SelectType.COMPONENT) {
    return <ComponentDataForm />;
  } else if (selectType === SelectType.PLUGIN) {
    return <PluginDataForm />;
  }
  if (selectType === SelectType.GLOBAL) {
    return <GlobalDataForm />;
  }
  return <NotAvailable />;
}

// export default DataAttrsEdit;

export const DataAttrsEdit = IDataAttrsEdit;
