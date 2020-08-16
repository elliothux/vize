import * as React from 'react';
import { observer } from 'mobx-react';
import { globalStore } from 'states';
import { ComponentInstance, LayoutMode } from 'types';
import { StreamLayoutRender } from './StreamLayoutRender';
import { FreeLayoutRender } from './FreeLayoutRender';

interface Props {
  mountTarget?: HTMLDivElement;
  // renderContext: Window;
  componentInstances: ComponentInstance[];
  containerComponentInstance?: ComponentInstance;
}

function ILayoutRender({ componentInstances, mountTarget, containerComponentInstance }: Props) {
  const { layoutMode } = globalStore;

  if (layoutMode === LayoutMode.STREAM) {
    return (
      <StreamLayoutRender
        mountTarget={mountTarget}
        componentInstances={componentInstances}
        containerComponentInstance={containerComponentInstance}
      />
    );
  }

  return <FreeLayoutRender componentInstances={componentInstances} />;
}

export const LayoutRender = observer(ILayoutRender);
