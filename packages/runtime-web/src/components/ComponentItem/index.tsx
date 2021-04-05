import * as React from 'react';
import { useCallback } from 'react';
import { ComponentInstance, ComponentSelectedCallback } from '@vize/types';
import {
  cancelCustomEvent,
  emitCustomEvent,
  getMaterialsComponent,
  onCustomEvent,
  setComponentSelectedCallback,
} from '../../libs';
import { AppRenderProps } from '../AppRender/types';
import { ComponentInstances } from '../ComponentInstances';
import { HotAreas } from '../HotAreas';

interface ItemProps extends Pick<AppRenderProps, 'globalData' | 'pageData' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function ComponentItem({ instance, globalData, pageData, meta, router }: ItemProps) {
  const { key, component, data, style, commonStyle, children } = instance;

  let childrenNode;
  if (children?.length) {
    childrenNode = (
      <ComponentInstances
        globalData={globalData}
        pageData={pageData}
        meta={meta}
        componentInstances={children}
        router={router}
      />
    );
  }

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
      pageData={pageData}
      router={router}
      hotAreas={
        <HotAreas instance={instance} globalData={globalData} pageData={pageData} meta={meta} router={router} />
      }
    >
      {childrenNode}
    </ViewRender>
  );
}
