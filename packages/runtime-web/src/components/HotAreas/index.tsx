import './index.scss';
import * as React from 'react';
import { ComponentInstance } from '@vize/types';
import { HotAreaItem } from './HotAreaItem';
import { AppRenderProps } from '../AppRender/types';

interface Props extends Pick<AppRenderProps, 'globalData' | 'pageData' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function HotAreas({ instance, globalData, pageData, meta, router }: Props) {
  if (!instance?.hotAreas?.length) {
    return null;
  }

  return (
    <div className="vize-hotareas-container">
      {instance.hotAreas.map(hotArea => (
        <HotAreaItem
          key={hotArea.key}
          hotArea={hotArea}
          componentInstance={instance}
          meta={meta}
          globalData={globalData}
          pageData={pageData}
          router={router}
        />
      ))}
    </div>
  );
}
