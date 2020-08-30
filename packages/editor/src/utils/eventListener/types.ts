import { MaterialsInfo, HotAreaPosition, HotAreaSize, GlobalMeta, ComponentEventListenerTypes } from 'types';

export enum EventListenerTarget {
  PAGE = 'page',
  COMPONENT = 'component',
  HOT_AREA = 'hotarea',
}

/**
 * @desc Page Events
 */

export enum PageEventListenerTypes {
  INIT = 'afterRender',
}

export interface PageEventListenerCallbackParams {
  global: object;
  meta: GlobalMeta;
}

export type PageEventListenerCallback = (params: PageEventListenerCallbackParams) => void;

export interface ComponentEventListenerCallbackParams {
  component: {
    key: number;
    id: number;
    info: MaterialsInfo;
    name: string;
    projId: number;
    projKey: string;
  };
  global: object;
  meta: GlobalMeta;
}

export type ComponentEventListenerCallback = (params: ComponentEventListenerCallbackParams) => void;

/**
 * @desc HotArea Events
 */
export type HotAreaEventListenerTypes = ComponentEventListenerTypes;

export interface HotAreaEventListenerCallbackParams {
  hotArea: {
    key: number;
    position: HotAreaPosition;
    size: HotAreaSize;
  };
  component: {
    key: number;
    id: number;
    info: MaterialsInfo;
    name: string;
    projId: number;
    projKey: string;
  };
  global: object;
  meta: GlobalMeta;
}

export type HotAreaEventListenerCallback = (params: HotAreaEventListenerCallbackParams) => void;
