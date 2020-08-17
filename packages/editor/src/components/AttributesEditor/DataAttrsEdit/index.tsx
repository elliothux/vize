import './index.scss';
import React from 'react';
import { SelectType } from 'states';
// import { componentsStore, materialsStore } from 'states';
// import { useMemo } from 'react';
// import { getCurrentPageComponentIndex } from 'utils';
import { ComponentDataForm } from './ComponentDataForm';

interface Props {
  selectType: number;
}

function Empty() {
  return <div>empty</div>;
}

function DataAttrsEdit({ selectType }: Props) {
  if (selectType === SelectType.COMPONENT) {
    return <ComponentDataForm />;
  } else if (selectType === SelectType.PLUGIN) {
    return <div>{'plugin'}</div>;
  }
  return <Empty />;
}

export default DataAttrsEdit;
