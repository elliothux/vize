import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Maybe, PageRouter } from '../../../types';

export interface RouterProps {
  pages: PageRouter['pages'];
  dynamicImports: { [key: number]: () => Promise<{ PageRender: React.ComponentType<any> }> };
}

export function Router({ pages, dynamicImports }: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);
  // TODO: remove
  (window as any).vize_router = router;
  return <PageLoader router={router} dynamicImports={dynamicImports} />;
}

function PageLoader({ router, dynamicImports }: { router: PageRouter; dynamicImports: RouterProps['dynamicImports'] }) {
  const [Page, setPage] = useState<Maybe<React.ComponentType<any>>>(null);

  const { currentPage } = router;
  useEffect(() => {
    const importPage = dynamicImports[currentPage];
    importPage &&
      importPage()
        .then(result => {
          setPage(() => result.PageRender);
        })
        .catch(e => {
          console.error('Load page error:\n', e);
        });
  }, [currentPage]);

  if (Page) {
    return <Page router={router} />;
  }

  return <Loading />;
}

function Loading() {
  return <div>loading...</div>;
}
