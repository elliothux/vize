import * as React from 'react';
import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { EventInstance } from './events';
import { CommonStyleMeta, Percent } from './styles';
import { GlobalMeta } from './global';
import { PageRouter } from './pages';

export interface MaterialsComponentMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly styleForm?: MaterialsForm;
  readonly enableStyleGroup?: CommonStyleMeta | '*';
  readonly enableWrapperStyleGroup?: CommonStyleMeta | '*';
  readonly thumb?: string;
  readonly preview?: string;
  readonly isContainer?: boolean;
  readonly hotArea?: boolean;
  readonly runtime?: 'react' | 'rax';
  readonly onEvents?: MaterialsCustomEvent[];
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly hideEditMask?: boolean;
  readonly isBuildIn?: boolean;
}

export interface ComponentPosition {
  x: number;
  y: number;
}

export interface ComponentSize {
  width: number;
  height: number;
}

export interface HotAreaPosition {
  x: Percent;
  y: Percent;
}

export interface HotAreaSize {
  width: Percent;
  height: Percent;
}

export interface HotArea {
  key: number;
  position: HotAreaPosition;
  size: HotAreaSize;
  events: EventInstance[];
  parent: ComponentInstance;
}

export interface ComponentInstance {
  key: Readonly<number>;
  component: Readonly<string>;
  lib: Readonly<string>;
  data: { [key: string]: any };
  style: { [key: string]: any };
  commonStyle: { [key: string]: any };
  wrapperStyle: { [key: string]: any };
  events: EventInstance[];
  children?: ComponentInstance[];
  parent?: ComponentInstance;
  layout?: {
    position: ComponentPosition;
    size?: ComponentSize;
  };
  hotAreas?: HotArea[];
  shared: boolean;
}

export interface ComponentSelectedCallbackParams {
  selected: boolean;
  asContainer?: boolean;
  asHotAreaContainer?: boolean;
}

export type ComponentSelectedCallback = (params: ComponentSelectedCallbackParams) => unknown;

export interface ComponentProps extends Pick<ComponentInstance, 'data' | 'style' | 'commonStyle'> {
  componentKey: Readonly<number>;
  meta: GlobalMeta;
  global: object;
  instance: ComponentInstance;
  hotAreas?: React.ReactElement;
  on: (eventName: string, callback: Function) => void;
  cancel: (eventName: string, callback: Function) => void;
  emit: (eventName: string) => void;
  onSelected: (callback: ComponentSelectedCallback) => void;
  router: PageRouter;
}

export type MaterialsComponent = React.ComponentType<ComponentProps>;
