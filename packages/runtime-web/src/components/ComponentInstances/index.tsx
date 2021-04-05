import * as React from 'react';
import { AppRenderProps } from '../AppRender/types';
import { ComponentItem } from '../ComponentItem';

export function ComponentInstances({
  globalData,
  pageData,
  meta,
  router,
  componentInstances,
}: Pick<AppRenderProps, 'globalData' | 'pageData' | 'meta' | 'router' | 'componentInstances'>) {
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem
          key={instance.key}
          instance={instance}
          globalData={globalData}
          pageData={pageData}
          meta={meta}
          router={router}
        />
      ))}
    </>
  );
}
