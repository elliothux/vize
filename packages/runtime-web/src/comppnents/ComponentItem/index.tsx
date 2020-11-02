import * as React from 'react';
import { useCallback } from 'react';
import { ComponentInstance } from '../../../types';
import { cancelCustomEvent, emitCustomEvent, getMaterialsComponent, onCustomEvent } from '../../libs';
import { AppRenderProps } from '../AppRender/types';
import { ComponentInstances } from '../ComponentInstances';
import { HotAreas } from '../HotAreas';

interface ItemProps extends Pick<AppRenderProps, 'global' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function ComponentItem({ instance, global, meta, router }: ItemProps) {
  const { key, component, data, style, commonStyle, children } = instance;

  let childrenNode;
  if (children?.length) {
    childrenNode = <ComponentInstances global={global} meta={meta} componentInstances={children} router={router} />;
  }

  const on = useCallback(
    (eventName: string, callback: Function) => onCustomEvent('component', key, eventName, callback),
    [key],
  );
  const cancel = useCallback(
    (eventName: string, callback: Function) => cancelCustomEvent('component', key, eventName, callback),
    [key],
  );
  const emit = useCallback((eventName: string) => emitCustomEvent(instance, eventName, meta, global, router), [key]);

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
      instance={instance}
      meta={meta}
      global={global}
      router={router}
      hotAreas={<HotAreas instance={instance} global={global} meta={meta} router={router} />}
    >
      {childrenNode}
    </ViewRender>
  );
}
