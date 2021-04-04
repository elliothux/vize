import * as React from 'react';
import { executePlugins } from '../../libs';
import { AppRenderProps } from './types';
import { ComponentInstances } from '../ComponentInstances';

export function AppRender({
  meta,
  globalData,
  pageData,
  componentInstances,
  pluginInstances,
  sharedComponentInstances,
  router,
}: AppRenderProps) {
  React.useEffect(() => executePlugins(pluginInstances, meta, globalData, pageData, router), []);

  return (
    <>
      {sharedComponentInstances ? (
        <ComponentInstances
          meta={meta}
          pageData={pageData}
          globalData={globalData}
          componentInstances={sharedComponentInstances}
          router={router}
        />
      ) : null}
      <ComponentInstances
        meta={meta}
        pageData={pageData}
        globalData={globalData}
        router={router}
        componentInstances={componentInstances}
      />
    </>
  );
}
