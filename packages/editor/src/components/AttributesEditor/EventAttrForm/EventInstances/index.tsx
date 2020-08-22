import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';
import { ComponentEventInstances } from './ComponentEventInstances';
import { PluginEventInstances } from './PluginEventInstances';

function IEventInstances() {
  const { selectType } = selectStore;
  switch (selectType) {
    case SelectType.COMPONENT:
      return <ComponentEventInstances />;
    case SelectType.PLUGIN:
      return <PluginEventInstances />;
  }
  return null;
}

export const EventInstances = observer(IEventInstances);
