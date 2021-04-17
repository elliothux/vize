import * as React from 'react';
import { Maybe, PageInstance, PageRouter } from '../../../types';
import { Router as DefaultRouter } from '../Router';
import { RenderEntryProps } from './types';
import { useCallback } from 'react';

let Router = DefaultRouter;

export function implementRouterController(CustomRouter: typeof DefaultRouter) {
  Router = CustomRouter;
}

let currentPageInstance: Maybe<PageInstance> = null;

export function getCurrentPageInstance(): Maybe<PageInstance> {
  return currentPageInstance;
}

let router: Maybe<PageRouter> = null;

export function getRouter(): Maybe<PageInstance> {
  return router;
}

// TODO: handle globalEvents
export function RenderEntry({
  meta,
  globalData,
  globalStyle,
  globalEvents,
  sharedComponentInstances,
  sharedPluginInstances,
  pages,
  pageImports,
}: RenderEntryProps) {
  const setCurrentPageInstance = useCallback((p: PageInstance) => {
    currentPageInstance = p;
  }, []);
  const setRouter = useCallback((r: PageRouter) => {
    router = r;
  }, []);
  return (
    <Router
      globalData={globalData}
      globalStyle={globalStyle}
      meta={meta}
      sharedComponentInstances={sharedComponentInstances}
      sharedPluginInstances={sharedPluginInstances}
      pages={pages}
      pageImports={pageImports}
      setCurrentPageInstance={setCurrentPageInstance}
      setRouter={setRouter}
    />
  );
}

export * from './types';
