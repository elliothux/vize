import { ComponentType } from 'react';
import { ComponentInstance } from './component';
import { PageInstance, RouterPageItem } from './pages';

export interface PageRouter {
  pages: RouterPageItem[];
  currentPage: number;
  setCurrentPage: (pageKey: number) => void;
}

export interface RouterProps {
  pages: RouterPageItem[];
  pageImports: {
    [key: number]: () => Promise<{ pageInstance: PageInstance }>;
  };
  sharedComponentInstances: ComponentInstance[];
  setCurrentPageInstance: (i: PageInstance) => void;
  setRouter: (r: PageRouter) => void;
  PageRender: ComponentType<RouterPageRenderProps>;
  ComponentsRender: ComponentType<RouterComponentsRenderProps>;
}

export interface RouterPageRenderProps {
  pageInstance: PageInstance;
}

export interface RouterComponentsRenderProps {
  componentInstances: ComponentInstance[];
}

export type Router = ComponentType<RouterProps>;
