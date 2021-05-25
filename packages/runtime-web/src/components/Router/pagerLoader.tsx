import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageInstance, Maybe, RouterProps } from '@vize/types';

interface Props extends Pick<RouterProps, 'PageRender' | 'pageImports' | 'setCurrentPageInstance'> {
  currentPage: number;
  currentPageInstance: Maybe<PageInstance>;
}

export function PageLoader({
  currentPage,
  pageImports,
  currentPageInstance,
  setCurrentPageInstance,
  PageRender,
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

  return <PageRender pageInstance={currentPageInstance} />;
}

export function Loading() {
  return <div>loading...</div>;
}

function LoadError() {
  return <div>Error occurred</div>;
}
