import * as React from 'react';
import { ComponentItem } from '../ComponentItem';
import { PageRenderProps } from '../PageRender/types';

export function ComponentInstances({
  globalData,
  globalStyle,
  pageData,
  pageStyle,
  meta,
  router,
  componentInstances,
}: Omit<PageRenderProps, 'sharedComponentInstances' | 'sharedPluginInstances' | 'pluginInstances'>) {
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem
          key={instance.key}
          instance={instance}
          globalData={globalData}
          globalStyle={globalStyle}
          pageData={pageData}
          pageStyle={pageStyle}
          meta={meta}
          router={router}
        />
      ))}
    </>
  );
}
