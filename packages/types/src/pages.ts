import * as React from 'react';
import { ComponentInstance, ComponentProps } from './component';
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

export interface PageRouter {
  pages: Omit<PageInstance, 'isNameEditing'>[];
  currentPage: number;
  setCurrentPage: (pageKey: number) => void;
}

export interface RouterProps extends Pick<ComponentProps, 'global' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicImports: { [key: number]: () => Promise<{ PageRender: React.ComponentType<object> }> };
  SharedComponentInstances: React.ComponentType<{ router: PageRouter }>;
}
