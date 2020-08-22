import { ComponentInstance } from './component';
import { PluginInstance } from './plugins';

export interface PageInstance {
  key: Readonly<number>;
  name: string;
  path: string;
  isHome: boolean;
  isNameEditing: boolean;
}

export interface PageData {
  componentInstances: ComponentInstance[];
  pluginInstances: PluginInstance[];
  // events: EventInstance[];
}

export enum PageMode {
  SINGLE = 'single',
  MULTI = 'multi',
}
