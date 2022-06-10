import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { i18n } from '@vize/i18n';
import { Empty } from 'widgets/Empty';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';
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

  return <Empty text={i18n.t('Not available')} />;
}

export const DataAttrsEdit = IDataAttrsEdit;
