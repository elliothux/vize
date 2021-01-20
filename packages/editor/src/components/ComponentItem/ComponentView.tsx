import * as React from 'react';
import { ComponentInstance, WithReactChildren } from 'types';
import { useCallback, useMemo } from 'react';
import {
  onCustomEvent,
  cancelCustomEvent,
  getMaterialsComponent,
  emitCustomEvent,
  setEditChildrenCallback,
} from 'runtime';
import { mergeCommonStyle } from 'runtime';
import { observer } from 'mobx-react';
import { NodeEventProxy } from 'runtime';
import { editStore, globalStore, pagesStore } from 'states';

interface Props extends WithReactChildren {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: Props) {
  const { key, component, data, style, commonStyle, wrapperStyle } = instance;
  const { previewMode } = editStore;
  const { metaInfo, globalProps } = globalStore;
  const { router } = pagesStore;

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

  const emit = useCallback((eventName: string) => emitCustomEvent(instance, eventName, metaInfo, globalProps, router), [
    key,
  ]);

  const onEditChildren = useMemo(() => {
    return children ? (callback: Function) => setEditChildrenCallback(key, callback) : undefined;
  }, [key]);

  return (
    <NodeEventProxy<ComponentInstance>
      className="component-event-proxy"
      childrenType="component"
      instance={instance}
      style={iWrapperStyle}
      global={globalProps}
      meta={metaInfo}
      router={router}
      previewMode={previewMode}
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
        emit={emit}
        onEditChildren={onEditChildren}
        router={router}
      >
        {children}
      </ComponentRender>
    </NodeEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
