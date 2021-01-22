import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';
import { GlobalDataForm } from './GlobalDataForm';

interface Props {
  selectType: SelectType;
}

function Empty() {
  return <div>empty</div>;
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
  return <Empty />;
}

// export default DataAttrsEdit;

export const DataAttrsEdit = IDataAttrsEdit;
