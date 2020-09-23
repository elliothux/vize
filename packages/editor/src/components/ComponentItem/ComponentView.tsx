import * as React from 'react';
import { ComponentInstance, WithReactChildren, PositionStyle, IPositionStyle } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponent, mergeCommonStyle, calPosition } from 'utils';
import { observer } from 'mobx-react';
import { ComponentEventProxy } from '../ComponentEventProxy';
import { globalStore } from 'states';

interface Props extends WithReactChildren {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
  const { key, component, data, commonStyle, wrapperStyle } = instance;
  const position = commonStyle.position as PositionStyle;
  const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);
  const iCommonStyle = useMemo(() => mergeCommonStyle(commonStyle), [commonStyle]);
  const iWrapperStyle = useMemo(() => mergeCommonStyle(wrapperStyle), [wrapperStyle]);

  let posStyle = {} as IPositionStyle;

  if (typeof position === 'object') {
    posStyle = position && calPosition(position);
  }

  // 全局页面元数据
  const { metaInfo } = globalStore;

  return (
    <ComponentEventProxy instance={instance} style={{ ...iWrapperStyle, ...posStyle }}>
      <ComponentRender
        componentKey={key}
        data={data}
        style={{}}
        commonStyle={iCommonStyle}
        instance={instance}
        meta={metaInfo}
      >
        {children}
      </ComponentRender>
    </ComponentEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
