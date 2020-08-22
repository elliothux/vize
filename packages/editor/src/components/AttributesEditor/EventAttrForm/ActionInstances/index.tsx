import './index.scss';
import * as React from 'react';
import { selectStore, SelectType } from 'states';
import { ComponentActionInstances } from './ComponentActionInstances';
import { observer } from 'mobx-react';
import { PluginActionInstances } from './PluginActionInstances';

function IActionInstances() {
  const { selectType } = selectStore;
  switch (selectType) {
    case SelectType.COMPONENT:
      return <ComponentActionInstances />;
    case SelectType.PLUGIN:
      return <PluginActionInstances />;
  }
  return null;
}

export const ActionInstances = observer(IActionInstances);
