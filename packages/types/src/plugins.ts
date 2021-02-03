import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent, EventInstance } from './events';
import { ComponentInstance, ComponentProps } from './component';
import { PageRouter } from './pages';

export interface MaterialsPluginMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly thumb?: string;
  readonly preview?: string;
  readonly onEvents?: MaterialsCustomEvent[];
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
}

export interface PluginInstance {
  key: Readonly<number>;
  plugin: Readonly<string>;
  lib: string;
  data: { [key: string]: any };
  events: EventInstance[];
}

// TODO
export interface PluginParams<D extends object = ComponentInstance['data'], G extends object = object>
  extends Pick<ComponentProps, 'on' | 'cancel' | 'emit' | 'meta'> {
  pluginKey: number;
  data: D;
  global: G;
  router: PageRouter;
}

export type MaterialsPlugin = (params: PluginParams) => void;
