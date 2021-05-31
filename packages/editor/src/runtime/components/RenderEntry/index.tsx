import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { ComponentInstance, Maybe, PageInstance, PageRouter, Router } from '@vize/types';
import { executePlugins } from '../../libs';
import { ComponentInstances } from '../ComponentInstances';
import { Router as DefaultRouter } from '../Router';
import { PageRender } from '../PageRender';
import { RenderEntryProps } from './types';

let RenderRouter: Router = DefaultRouter;

export function implementRouterController(CustomRouter: Router) {
  RenderRouter = CustomRouter;
}

let currentPageInstance: Maybe<PageInstance> = null;

export function getCurrentPageInstance(): Maybe<PageInstance> {
  return currentPageInstance;
}

let router: Maybe<PageRouter> = null;

export function getRouter(): Maybe<PageRouter> {
  return router;
}

interface RouterPageRenderProps {
  pageInstance: PageInstance;
}

interface RouterComponentsRenderProps {
  componentInstances: ComponentInstance[];
}

export function RenderEntry({
  meta,
  globalData,
  globalStyle,
  // TODO: handle globalEvents
  globalEvents,
  sharedComponentInstances,
  sharedPluginInstances,
  pages,
  pageImports,
}: RenderEntryProps) {
  const setCurrentPageInstance = useCallback((pageInstance: PageInstance) => {
    if (!pageInstance || pageInstance.key === currentPageInstance?.key) {
      return;
    }
    currentPageInstance = pageInstance;
    executePlugins({
      pluginInstances: sharedPluginInstances,
      meta,
      globalData,
      globalStyle,
      pageData: pageInstance.data,
      pageStyle: pageInstance.style,
      router: router!,
    });
  }, []);

  const setRouter = useCallback((r: PageRouter) => {
    router = r;
  }, []);

  const RouterPageRender = useMemo(
    () =>
      function EntryRouterPageRender({
        pageInstance: { data, style, componentInstances, pluginInstances },
      }: RouterPageRenderProps) {
        return (
          <PageRender
            router={router!}
            meta={meta}
            globalData={globalData}
            globalStyle={globalStyle}
            pageData={data}
            pageStyle={style}
            componentInstances={componentInstances}
            pluginInstances={pluginInstances}
          />
        );
      },
    [],
  );

  const RouterComponentsRender = useMemo(
    () =>
      function EntryRouterComponentsRender({ componentInstances }: RouterComponentsRenderProps) {
        return (
          <ComponentInstances
            router={router!}
            meta={meta}
            globalData={globalData}
            globalStyle={globalStyle}
            pageData={getCurrentPageInstance()!.data}
            pageStyle={getCurrentPageInstance()!.style}
            componentInstances={componentInstances}
          />
        );
      },
    [],
  );

  return (
    <RenderRouter
      pages={pages}
      pageImports={pageImports}
      sharedComponentInstances={sharedComponentInstances}
      setCurrentPageInstance={setCurrentPageInstance}
      setRouter={setRouter}
      PageRender={RouterPageRender}
      ComponentsRender={RouterComponentsRender}
    />
  );
}

export * from './types';
