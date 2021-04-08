import * as React from 'react';
import { useEffect } from 'react';
import { executePlugins } from '../../libs';
import { ComponentInstances } from '../ComponentInstances';
import { PageRenderProps } from './types';

export function PageRender({
  router,
  meta,
  globalData,
  globalStyle,
  sharedComponentInstances,
  sharedPluginInstances,
  pageData,
  pageStyle,
  componentInstances,
  pluginInstances,
}: PageRenderProps) {
  useEffect(() => {
    [sharedPluginInstances, pluginInstances].forEach(pluginInstances =>
      executePlugins({
        pluginInstances,
        meta,
        globalData,
        globalStyle,
        pageData,
        pageStyle,
        router,
      }),
    );
  }, []);

  return (
    <>
      {sharedComponentInstances ? (
        <ComponentInstances
          meta={meta}
          globalData={globalData}
          globalStyle={globalStyle}
          pageData={pageData}
          pageStyle={pageStyle}
          componentInstances={sharedComponentInstances}
          router={router}
        />
      ) : null}
      <ComponentInstances
        meta={meta}
        globalData={globalData}
        globalStyle={globalStyle}
        pageData={pageData}
        pageStyle={pageStyle}
        router={router}
        componentInstances={componentInstances}
      />
    </>
  );
}
