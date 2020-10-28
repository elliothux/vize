import * as React from 'react';
import { ComponentInstance, WithReactChildren, PositionStyle, IPositionStyle } from 'types';
import { useCallback, useMemo } from 'react';
import { onCustomEvent, cancelCustomEvent, getMaterialsComponent } from 'runtime';
import { mergeCommonStyle, calPosition } from 'utils';
import { observer } from 'mobx-react';
import { NodeEventProxy } from 'runtime';
import { globalStore } from 'states';

interface Props extends WithReactChildren {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
  const { key, component, data, style, commonStyle, wrapperStyle } = instance;
  const position = commonStyle.position as PositionStyle;
  const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);
  const iCommonStyle = useMemo(() => mergeCommonStyle(commonStyle), [commonStyle]);
  const iWrapperStyle = useMemo(() => mergeCommonStyle(wrapperStyle), [wrapperStyle]);

  const on = useCallback(
    (eventName: string, callback: Function) => onCustomEvent('component', key, eventName, callback),
    [key],
  );
  const cancel = useCallback(
    (eventName: string, callback: Function) => cancelCustomEvent('component', key, eventName, callback),
    [key],
  );

  let posStyle = {} as IPositionStyle;
  if (typeof position === 'object') {
    posStyle = position && calPosition(position);
  }

  // 全局页面元数据
  const { metaInfo, globalProps } = globalStore;

  return (
    <NodeEventProxy<ComponentInstance>
      className="component-event-proxy"
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
        style={style}
        commonStyle={iCommonStyle}
        instance={instance}
        global={globalProps}
        meta={metaInfo}
        on={on}
        cancel={cancel}
        emit={console.log}
      >
        {children}
      </ComponentRender>
    </NodeEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
