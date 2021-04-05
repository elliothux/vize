import { createElement, useCallback, useMemo } from 'rax';
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
import { getData } from '../../utils';

interface ItemProps extends Pick<AppRenderProps, 'globalData' | 'pageData' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function ComponentItem({ instance, globalData, pageData, meta, router }: ItemProps) {
  const { key, component, data, style, commonStyle, children } = instance;

  let childrenNode;
  if (children?.length) {
    childrenNode = <ComponentInstances global={global} meta={meta} componentInstances={children} router={router} />;
  }

  const on = useCallback(
    (eventName: string, callback: Function) => onCustomEvent('component', eventName, callback, key),
    [key],
  );

  const cancel = useCallback(
    (eventName: string, callback: Function) => cancelCustomEvent('component', eventName, callback, key),
    [key],
  );

  const emit = useCallback((eventName: string) => emitCustomEvent(instance, eventName, meta, global, router), [key]);

  const onSelected = useCallback((callback: ComponentSelectedCallback) => setComponentSelectedCallback(key, callback), [
    key,
  ]);

  const componentData = useMemo(() => getData(key, 'component'), [key]);

  const ViewRender = getMaterialsComponent(component)!;
  return (
    <ViewRender
      key={key}
      componentKey={key}
      data={componentData?.data || data}
      style={componentData?.style || style}
      commonStyle={commonStyle}
      on={on}
      cancel={cancel}
      emit={emit}
      onSelected={onSelected}
      instance={instance}
      meta={meta}
      globalData={global}
      router={router}
      hotAreas={<HotAreas instance={instance} global={global} meta={meta} router={router} />}
    >
      {childrenNode}
    </ViewRender>
  );
}
