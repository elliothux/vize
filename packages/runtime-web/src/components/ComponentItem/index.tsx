import * as React from 'react';
import { useCallback } from 'react';
import { ComponentInstance, ComponentSelectedCallback } from '../../../types';
import {
  cancelCustomEvent,
  emitCustomEvent,
  getMaterialsComponent,
  onCustomEvent,
  setComponentSelectedCallback,
} from '../../libs';
import { PageRenderProps } from '../PageRender/types';
import { ComponentInstances } from '../ComponentInstances';
import { HotAreas } from '../HotAreas';

interface ItemProps
  extends Omit<
    PageRenderProps,
    'sharedComponentInstances' | 'sharedPluginInstances' | 'componentInstances' | 'pluginInstances'
  > {
  instance: ComponentInstance;
}

export function ComponentItem({ instance, globalData, globalStyle, pageData, pageStyle, meta, router }: ItemProps) {
  const { key, component, data, style, commonStyle, hotAreas, children } = instance;

  const childrenNode = children?.length ? (
    <ComponentInstances
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      meta={meta}
      componentInstances={children}
      router={router}
    />
  ) : null;

  const hotAreasNode = hotAreas?.length ? (
    <HotAreas
      hotAreas={hotAreas}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      meta={meta}
      router={router}
    />
  ) : null;

  const on = useCallback(
    (eventName: string, callback: Function) => onCustomEvent('component', eventName, callback, key),
    [key],
  );

  const cancel = useCallback(
    (eventName: string, callback: Function) => cancelCustomEvent('component', eventName, callback, key),
    [key],
  );

  const emit = useCallback(
    (eventName: string) => emitCustomEvent(instance.events, eventName, meta, globalData, pageData, router),
    [key],
  );

  const onSelected = useCallback((callback: ComponentSelectedCallback) => setComponentSelectedCallback(key, callback), [
    key,
  ]);

  const ViewRender = getMaterialsComponent(component)!;
  return (
    <ViewRender
      key={key}
      componentKey={key}
      data={data}
      style={style}
      commonStyle={commonStyle}
      on={on}
      cancel={cancel}
      emit={emit}
      onSelected={onSelected}
      instance={instance}
      meta={meta}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      router={router}
      hotAreas={hotAreasNode || undefined}
    >
      {childrenNode}
    </ViewRender>
  );
}
