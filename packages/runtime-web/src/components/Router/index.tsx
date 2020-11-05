import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ComponentInstance, Maybe, PageRouter } from '../../../types';
import { ComponentInstances } from '../../components/ComponentInstances';
import { AppRenderProps } from '../AppRender/types';

export interface RouterProps extends Pick<AppRenderProps, 'global' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicImports: { [key: number]: () => Promise<{ PageRender: React.ComponentType<any> }> };
  sharedComponentInstances: ComponentInstance[];
}

export function Router({ pages, dynamicImports, sharedComponentInstances, global, meta }: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  // TODO: remove
  (window as any).vize_router = router;
  return (
    <>
      <ComponentInstances global={global} meta={meta} componentInstances={sharedComponentInstances} router={router} />
      <PageLoader router={router} dynamicImports={dynamicImports} />
    </>
  );
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
