import * as React from 'react';
import { ComponentInstance, WithReactChildren, PositionStyle, IPositionStyle } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponent } from 'runtime';
import { mergeCommonStyle, calPosition } from 'utils';
import { observer } from 'mobx-react';
import { NodeEventProxy } from 'runtime';
import { globalStore, materialsStore } from 'states';

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
    <NodeEventProxy<ComponentInstance>
      childrenType="component"
      instance={instance}
      style={{ ...iWrapperStyle, ...posStyle }}
      global={globalStore.globalProps}
      meta={globalStore.metaInfo}
      previewMode={globalStore.previewMode}
    >
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
    </NodeEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
