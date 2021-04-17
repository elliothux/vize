import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Maybe, PageInstance, PageRouter } from '../../../types';
import { executePlugins } from '../../libs';
import { ComponentInstances } from '../ComponentInstances';
import { Loading, PageLoader } from './pagerLoader';
import { RouterProps } from './types';

export function Router({
  globalData,
  globalStyle,
  meta,
  sharedComponentInstances,
  sharedPluginInstances,
  pages,
  pageImports,
  setCurrentPageInstance,
  setRouter,
}: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const [pageInstance, setPageInstance] = useState<Maybe<PageInstance>>(null);

  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  useEffect(() => {
    setRouter(router);
    setCurrentPageInstance(pageInstance);
  }, [pageInstance, router]);

  useEffect(() => {
    if (!pageInstance) {
      return;
    }
    executePlugins({
      pluginInstances: sharedPluginInstances,
      meta,
      globalData,
      globalStyle,
      pageData: pageInstance.data,
      pageStyle: pageInstance.style,
      router,
    });
  }, [pageInstance]);

  if (!pageInstance) {
    return <Loading />;
  }

  return (
    <>
      <ComponentInstances
        meta={meta}
        globalData={globalData}
        globalStyle={globalStyle}
        pageData={pageInstance.data}
        pageStyle={pageInstance.style}
        componentInstances={sharedComponentInstances}
        router={router}
      />
      <PageLoader
        globalData={globalData}
        globalStyle={globalStyle}
        meta={meta}
        pageImports={pageImports}
        router={router}
        currentPageInstance={pageInstance}
        setCurrentPageInstance={setPageInstance}
      />
    </>
  );
}
