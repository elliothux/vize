import './index.scss';
import { createElement } from 'rax';
import { ComponentInstance } from '@vize/types/src';
import { HotAreaItem } from './HotAreaItem';
import { AppRenderProps } from '../AppRender/types';

interface Props extends Pick<AppRenderProps, 'global' | 'meta' | 'router'> {
  instance: ComponentInstance;
}

export function HotAreas({ instance, global, meta, router }: Props) {
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
          global={global}
          meta={meta}
          router={router}
        />
      ))}
    </div>
  );
}
