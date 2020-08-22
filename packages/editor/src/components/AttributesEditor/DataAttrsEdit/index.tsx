import './index.scss';
import React from 'react';
import { SelectType } from 'states';
import { ComponentDataForm } from './ComponentDataForm';
import { PluginDataForm } from './PluginDataForm';

interface Props {
  selectType: number;
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
  return <Empty />;
}

// export default DataAttrsEdit;

export const DataAttrsEdit = IDataAttrsEdit;
