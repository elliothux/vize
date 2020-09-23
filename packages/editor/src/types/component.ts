import * as React from 'react';
import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { EventInstance } from './events';
import { Maybe } from './helper';
import { HotArea } from './hotArea';
import { CommonStyleMeta } from './styles';
import { GlobalMeta } from './global';

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

export interface ComponentInstance {
  key: Readonly<number>;
  component: Readonly<string>;
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
}

export interface ComponentProps extends Pick<ComponentInstance, 'data' | 'style' | 'commonStyle'> {
  componentKey: Readonly<number>;
  meta?: GlobalMeta;
  instance: ComponentInstance;
  hotAreas: Maybe<React.ReactElement>;
}

export type MaterialsComponent = React.ComponentType<ComponentProps>;
