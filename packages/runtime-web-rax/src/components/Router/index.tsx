import * as Rax from 'rax';
import { createElement, useEffect, useMemo, useState } from 'rax';
import { ComponentInstance, Maybe, PageRouter } from '@vize/types/src';
import { ComponentInstances } from '../../components/ComponentInstances';
import { AppRenderProps } from '../AppRender/types';

export interface RouterProps extends Pick<AppRenderProps, 'global' | 'meta'> {
  pages: PageRouter['pages'];
  dynamicPageImports: { [key: number]: () => Promise<{ PageRender: Rax.ComponentType<any> }> };
  sharedComponentInstances: ComponentInstance[];
}

export function Router({ pages, dynamicPageImports, sharedComponentInstances, global, meta }: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

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
  const [Page, setPage] = useState<Maybe<Rax.ComponentType<any>>>(null);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Page router={router} />;
  }

  return null;
}
