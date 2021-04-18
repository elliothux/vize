import './index.scss';
import * as React from 'react';
import { HotArea } from '../../../types';
import { HotAreaItem } from './HotAreaItem';
import { PageRenderProps } from '../PageRender/types';

interface Props
  extends Omit<
    PageRenderProps,
    'sharedComponentInstances' | 'sharedPluginInstances' | 'componentInstances' | 'pluginInstances' | ''
  > {
  hotAreas: HotArea[];
}

export function HotAreas({ hotAreas, globalData, globalStyle, pageData, pageStyle, meta, router }: Props) {
  return (
    <div className="vize-hotareas-container">
      {hotAreas.map(hotArea => (
        <HotAreaItem
          key={hotArea.key}
          hotArea={hotArea}
          meta={meta}
          globalData={globalData}
          globalStyle={globalStyle}
          pageData={pageData}
          pageStyle={pageStyle}
          router={router}
        />
      ))}
    </div>
  );
}
