import * as React from 'react';
import { ComponentInstance } from '@vize/types';
import { PageRenderProps } from '../PageRender/types';
import { ComponentInstances } from '../ComponentInstances';
import { HotAreas } from '../HotAreas';
import { ComponentView } from './ComponentView';

interface ItemProps
  extends Omit<
    PageRenderProps,
    'sharedComponentInstances' | 'sharedPluginInstances' | 'componentInstances' | 'pluginInstances'
  > {
  instance: ComponentInstance;
}

export function ComponentItem({ instance, globalData, globalStyle, pageData, pageStyle, meta, router }: ItemProps) {
  const { hotAreas, children } = instance;

  const childrenNode = children?.length ? (
    <ComponentInstances
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      meta={meta}
      componentInstances={children}
      router={router}
    />
  ) : null;

  const hotAreasNode = hotAreas?.length ? (
    <HotAreas
      hotAreas={hotAreas}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      meta={meta}
      router={router}
    />
  ) : null;

  return (
    <ComponentView
      instance={instance}
      previewMode={false}
      router={router}
      meta={meta}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      hotAreas={hotAreasNode || undefined}
    >
      {childrenNode}
    </ComponentView>
  );
}

export * from './ComponentView';
