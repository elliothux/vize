import { ComponentType } from 'react';
import { ComponentInstance, ComponentProps } from './component';
import { PluginInstance } from './plugins';
import { EventInstance } from './events';

export interface PageInstance {
  key: Readonly<number>;
  name: string;
  path: string;
  isHome: boolean;
  data: object;
  style: object;
  events: EventInstance[];
  componentInstances: ComponentInstance[];
  pluginInstances: PluginInstance[];
}

export enum PageMode {
  SINGLE = 'single',
  MULTI = 'multi',
}

export interface PageRouter {
  pages: PageInstance[];
  currentPage: number;
  setCurrentPage: (pageKey: number) => void;
}

export interface RouterProps extends Pick<ComponentProps, 'global' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicImports: { [key: number]: () => Promise<{ PageRender: ComponentType<object> }> };
  SharedComponentInstances: ComponentType<{ router: PageRouter }>;
}
