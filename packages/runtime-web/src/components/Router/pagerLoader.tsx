import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageInstance, PageRouter, Maybe } from '../../../types';
import { PageRender } from '../PageRender';
import { RouterProps } from './types';

interface Props extends Pick<RouterProps, 'globalData' | 'globalStyle' | 'meta' | 'pageImports'> {
  router: PageRouter;
  currentPageInstance: Maybe<PageInstance>;
  setCurrentPageInstance: (p: PageInstance) => void;
}

export function PageLoader({
  globalData,
  globalStyle,
  meta,
  pageImports,
  router,
  currentPageInstance,
  setCurrentPageInstance,
  router: { currentPage },
}: Props) {
  const [[loading, error], setStatus] = useState([true, false]);

  useEffect(() => {
    setStatus([true, false]);
    const pageImport = pageImports[currentPage];
    if (!pageImport) {
      window.location.href = `/${currentPage}`;
      return;
    }

    pageImport()
      .then(({ pageInstance }) => {
        setCurrentPageInstance(pageInstance);
        setStatus([false, false]);
      })
      .catch(e => {
        console.error('Load page error:\n', e);
        setStatus([false, true]);
      });
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <LoadError />;
  }

  const { data: pageData, style: pageStyle, componentInstances, pluginInstances } = currentPageInstance!;
  return (
    <PageRender
      router={router}
      meta={meta}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      componentInstances={componentInstances}
      pluginInstances={pluginInstances}
    />
  );
}

export function Loading() {
  return <div>loading...</div>;
}

function LoadError() {
  return <div>Error occurred</div>;
}
