import * as React from 'react';
import { ComponentInstance, HotArea, Maybe, GlobalMeta } from 'types';
import { EventProxy } from 'utils/eventProxy';
import { HotAreaEventListenerCallback, HotAreaEventListenerTypes } from './types';
import { generatePluginEventListenerCallbackParams } from '../eventParams';

const hotAreaEventListeners = new EventProxy<HotAreaEventListenerTypes>();

export function onHotArea(eventType: HotAreaEventListenerTypes, callback: HotAreaEventListenerCallback) {
  hotAreaEventListeners.on(eventType, callback);
}

export function emitHotArea(
  e: Maybe<React.SyntheticEvent>,
  {
    eventType,
    hotArea,
    component,
    meta,
    global,
  }: {
    eventType: HotAreaEventListenerTypes;
    hotArea: HotArea;
    component: ComponentInstance;
    meta: GlobalMeta;
    global: object;
  },
) {
  const params = generatePluginEventListenerCallbackParams(eventType, global, meta, component, hotArea);
  if (e) {
    params.originalEvent = e;
  }
  hotAreaEventListeners.emit(eventType, params);
}
