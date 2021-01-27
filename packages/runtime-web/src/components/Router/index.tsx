import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ComponentInstance, Maybe, PageRouter } from '@vize/types/src';
import { ComponentInstances } from '../../components/ComponentInstances';
import { AppRenderProps } from '../AppRender/types';

export interface RouterProps extends Pick<AppRenderProps, 'global' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicPageImports: { [key: number]: () => Promise<{ PageRender: React.ComponentType<any> }> };
  sharedComponentInstances: ComponentInstance[];
}

export function Router({ pages, dynamicPageImports, sharedComponentInstances, global, meta }: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  // TODO: remove
  (window as any).vize_router = router;
  return (
    <>
      <ComponentInstances global={global} meta={meta} componentInstances={sharedComponentInstances} router={router} />
      <PageLoader router={router} dynamicImports={dynamicPageImports} />
    </>
  );
}

function PageLoader({
  router,
  dynamicImports,
}: {
  router: PageRouter;
  dynamicImports: RouterProps['dynamicPageImports'];
}) {
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
