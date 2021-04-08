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
  const { metaInfo, globalData, globalStyle } = globalStore;
  const {
    router,
    currentPage: { data: pageData, style: pageStyle },
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
      meta={metaInfo}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      router={router}
      previewMode={previewMode}
      style={iWrapperStyle}
    >
      <ComponentRender
        componentKey={key}
        data={data}
        style={style}
        commonStyle={iCommonStyle}
        instance={instance}
        globalData={globalData}
        globalStyle={globalStyle}
        pageData={pageData}
        pageStyle={pageStyle}
        meta={metaInfo}
        router={router}
        on={on}
        cancel={cancel}
        emit={emit}
        onSelected={onSelected}
      >
        {children}
      </ComponentRender>
    </NodeEventProxy>
  );
}

export const ComponentView = observer(IComponentView);
