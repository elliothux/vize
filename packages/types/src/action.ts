import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent } from './events';
import { ComponentInstance, ComponentProps } from './component';

export interface MaterialsActionMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
  readonly maxTimeout?: 'infinity' | number;
}

export interface ActionParams<D extends object = ComponentInstance['data']>
  extends Pick<ComponentProps, 'router' | 'meta' | 'globalData' | 'pageData'> {
  data: D;
}

export type MaterialsAction = (params: ActionParams) => void | Promise<void>;
