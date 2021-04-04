import * as React from 'react';
import { ComponentInstance, ComponentSelectedCallback } from 'types';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import {
  onCustomEvent,
  cancelCustomEvent,
  getMaterialsComponent,
  emitCustomEvent,
  setComponentSelectedCallback,
} from 'runtime';
import { mergeCommonStyle } from 'runtime';
import { observer } from 'mobx-react';
import { NodeEventProxy } from 'runtime';
import { editStore, globalStore, pagesStore } from 'states';

interface Props {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: PropsWithChildren<Props>) {
  const { key, component, data, style, commonStyle, wrapperStyle } = instance;
  const { previewMode } = editStore;
  const { metaInfo, globalData } = globalStore;
  const {
    router,
    currentPage: { data: pageData },
  } = pagesStore;

  const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [component]);
  const iCommonStyle = useMemo(() => mergeCommonStyle(commonStyle), [commonStyle]);
  const iWrapperStyle = useMemo(() => mergeCommonStyle(wrapperStyle), [wrapperStyle]);

  const on = useCallback(
    (eventName: string, callback: Function) => onCustomEvent('component', eventName, callback, key),
    [key],
  );

  const cancel = useCallback(
    (eventName: string, callback: Function) => cancelCustomEvent('component', eventName, callback, key),
    [key],
  );

  const emit = useCallback(
    (eventName: string) => emitCustomEvent(instance.events, eventName, metaInfo, globalData, pageData, router),
    [key],
  );

  const onSelected = useCallback((callback: ComponentSelectedCallback) => setComponentSelectedCallback(key, callback), [
    key,
  ]);

  return (
    <NodeEventProxy<ComponentInstance>
      className="component-event-proxy"
      childrenType="component"
      instance={instance}
      style={iWrapperStyle}
      global={globalData}
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
        globalData={globalData}
        pageData={pageData}
        meta={metaInfo}
        on={on}
        cancel={cancel}
        emit={emit}
        onSelected={onSelected}
        router={router}
      >
        {children}
      </ComponentRender>
    </NodeEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
