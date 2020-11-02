import { MaterialsInfo } from './materials';
import { MaterialsForm } from './form';
import { MaterialsCustomEvent, EventInstance } from './events';
import { ComponentProps } from './component';
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

export interface PluginParams extends Pick<ComponentProps, 'data' | 'on' | 'cancel' | 'emit' | 'global' | 'meta'> {
  pluginKey: number;
  router: PageRouter;
}

export type MaterialsPlugin = (params: PluginParams) => void;
