import * as React from 'react';
import { ComponentInstance, WithReactChildren } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponent, mergeCommonStyle } from 'utils';
import { observer } from 'mobx-react';
import { ComponentEventProxy } from '../ComponentEventProxy';

interface Props extends WithReactChildren {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
  const { key, component, data, commonStyle } = instance;
  // console.log(data, 333);
  // console.log(commonStyle);
  const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);
  const iCommonStyle = useMemo(() => mergeCommonStyle(commonStyle), [commonStyle]);

  return (
    <ComponentEventProxy instance={instance}>
      <ComponentRender componentKey={key} data={data} style={{}} commonStyle={iCommonStyle} instance={instance}>
        {children}
      </ComponentRender>
    </ComponentEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
