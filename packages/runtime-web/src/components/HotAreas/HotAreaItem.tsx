import * as React from 'react';
import { useMemo } from 'react';
import { HotArea } from '../../../types';
import { NodeEventProxy } from '../NodeEventProxy';
import { PageRenderProps } from '../PageRender/types';

interface Props
  extends Omit<
    PageRenderProps,
    'sharedComponentInstances' | 'sharedPluginInstances' | 'componentInstances' | 'pluginInstances' | ''
  > {
  hotArea: HotArea;
}

export function HotAreaItem({ hotArea, globalData, globalStyle, pageData, pageStyle, meta, router }: Props) {
  const { size, position } = hotArea;
  const style = useMemo(
    () => ({
      width: percent(size.width),
      height: percent(size.height),
      left: percent(position.x),
      top: percent(position.y),
    }),
    [size, position],
  );

  return (
    <NodeEventProxy<HotArea>
      className="hotarea-event-proxy"
      childrenType="hotarea"
      instance={hotArea}
      meta={meta}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
      router={router}
      previewMode={false}
      style={style}
    />
  );
}

export function percent(percent: number): string {
  return `${percent}%`;
}
