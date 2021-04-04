import './index.scss';
import * as React from 'react';
import { ComponentInstance } from '@vize/types';
import { HotAreaItem } from './HotAreaItem';
import { AppRenderProps } from '../AppRender/types';

interface Props extends Pick<AppRenderProps, 'globalData' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function HotAreas({ instance, globalData, meta, router }: Props) {
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
          globalData={globalData}
          meta={meta}
          router={router}
        />
      ))}
    </div>
  );
}
