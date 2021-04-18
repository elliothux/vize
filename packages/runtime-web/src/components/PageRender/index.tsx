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
  pageData,
  pageStyle,
  componentInstances,
  pluginInstances,
}: PageRenderProps) {
  useEffect(() => {
    executePlugins({
      pluginInstances,
      meta,
      globalData,
      globalStyle,
      pageData,
      pageStyle,
      router,
    });
  }, []);

  return (
    <ComponentInstances
      meta={meta}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      router={router}
      componentInstances={componentInstances}
    />
  );
}
