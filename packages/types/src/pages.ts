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

export interface RouterPageItem extends Pick<PageInstance, 'key' | 'name' | 'path' | 'isHome'> {
  on: (eventName: string, callback: Function) => void;
  cancel: (eventName: string, callback: Function) => void;
  emit: (eventName: string) => void;
}

export interface PageRouter {
  pages: RouterPageItem[];
  currentPage: number;
  setCurrentPage: (pageKey: number) => void;
}

export interface RouterProps extends Pick<ComponentProps, 'globalData' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicImports: { [key: number]: () => Promise<{ PageRender: ComponentType<object> }> };
  SharedComponentInstances: ComponentType<{ router: PageRouter }>;
}
