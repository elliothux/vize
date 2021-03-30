import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';
import { NotAvailable } from '../NotAvailable';
import { GlobalDataMetaForm } from './GlobalDataMetaForm';
import { PageDataForm } from './PageDataForm';

interface Props {
  selectType: SelectType;
}

function IDataAttrsEdit({ selectType }: Props) {
  if (selectType === SelectType.COMPONENT) {
    return <ComponentDataForm />;
  }

  if (selectType === SelectType.PLUGIN) {
    return <PluginDataForm />;
  }

  if (selectType === SelectType.PAGE) {
    return <PageDataForm />;
  }

  if (selectType === SelectType.GLOBAL) {
    return <GlobalDataMetaForm />;
  }

  return <NotAvailable />;
}

export const DataAttrsEdit = IDataAttrsEdit;
