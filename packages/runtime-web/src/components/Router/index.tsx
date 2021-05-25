import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Maybe, PageInstance, PageRouter, RouterProps } from '@vize/types';
import { PageLoader } from './pagerLoader';

export function Router({
  setCurrentPageInstance,
  setRouter,
  pages,
  pageImports,
  sharedComponentInstances,
  ComponentsRender,
  PageRender,
}: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const [pageInstance, setPageInstance] = useState<Maybe<PageInstance>>(null);

  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  useEffect(() => {
    setRouter(router);
    setCurrentPageInstance(pageInstance);
  }, [pageInstance, router]);

  return (
    <>
      {sharedComponentInstances && <ComponentsRender componentInstances={sharedComponentInstances} />}
      <PageLoader
        pageImports={pageImports}
        currentPage={currentPage}
        currentPageInstance={pageInstance}
        setCurrentPageInstance={setPageInstance}
        PageRender={PageRender}
      />
    </>
  );
}
