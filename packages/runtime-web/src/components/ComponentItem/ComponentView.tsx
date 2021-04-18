import * as React from 'react';
import { PropsWithChildren, ReactElement, useCallback, useMemo } from 'react';
import { ComponentInstance, ComponentSelectedCallback } from '../../../types';
import {
  onCustomEvent,
  cancelCustomEvent,
  getMaterialsComponent,
  emitCustomEvent,
  setComponentSelectedCallback,
  mergeCommonStyle,
} from '../../libs';
import { NodeEventProxy } from '../NodeEventProxy';
import { PageRenderProps } from '../PageRender/types';

interface Props extends Omit<PageRenderProps, 'componentInstances' | 'pluginInstances'> {
  instance: ComponentInstance;
  previewMode: boolean;
  hotAreas?: ReactElement;
}

export function ComponentView({
  instance,
  previewMode,
  router,
  meta,
  globalData,
  globalStyle,
  pageData,
  pageStyle,
  hotAreas,
  children,
}: PropsWithChildren<Props>) {
  const { key, component, data, style, commonStyle, wrapperStyle, events } = instance;
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
    (eventName: string) =>
      emitCustomEvent({
        events,
        eventName,
        router,
        meta,
        globalData,
        globalStyle,
        pageData,
        pageStyle,
      }),
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
      meta={meta}
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
        meta={meta}
        router={router}
        on={on}
        cancel={cancel}
        emit={emit}
        onSelected={onSelected}
        hotAreas={hotAreas}
      >
        {children}
      </ComponentRender>
    </NodeEventProxy>
  );
}
