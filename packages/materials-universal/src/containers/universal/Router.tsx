import * as React from 'react';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import ReactSwipe from 'react-swipe';

export function Router({ pages, dynamicPageImports, SharedComponentInstances }: any) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const router = useMemo(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  const ref = useRef(null);
  useEffect(() => {
    ref.current?.slide?.(pages.findIndex(page => page.key === currentPage));
  }, [currentPage]);

  // TODO: remove
  (window as any).vize_router = router;
  return (
    <>
      <SharedComponentInstances router={router} />
      <SwipePages pages={pages} setCurrentPage={router.setCurrentPage} setRef={ref}>
        {(pages as any).map(({ key }) => (
          <div key={key} className="swipe-page">
            <PageLoader pageKey={key} router={router} dynamicImport={dynamicPageImports[key]} />
          </div>
        ))}
      </SwipePages>
    </>
  );
}

function SwipePages({ pages, setCurrentPage, children, setRef }: any) {
  const transitionEnd = useCallback(
    (index: number) => {
      const pageKey = pages[index].key;
      setCurrentPage(pageKey);
    },
    [pages],
  );

  return (
    <ReactSwipe
      ref={setRef}
      className="swipe-pages"
      swipeOptions={{
        continuous: false,
        callback: transitionEnd,
        // startSlide: pages.findIndex(i => i.key === router.currentPage),
      }}
    >
      {children}
    </ReactSwipe>
  );
}

function PageLoader({ pageKey, router, dynamicImport }: any) {
  const [Page, setPage] = useState(null);

  useEffect(() => {
    if (router.currentPage !== pageKey || Page) {
      return;
    }

    dynamicImport()
      .then(({ PageRender }) => {
        setPage(() => PageRender);
      })
      .catch(e => {
        console.error('Load page error:\n', e);
      });
  }, [router.currentPage]);

  if (Page) {
    return <Page router={router} />;
  }

  return <Loading />;
}

function Loading() {
  return <div>loading...</div>;
}
