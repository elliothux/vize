import * as React from 'react';
import { observer } from 'mobx-react';
import { editStore } from 'states';
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
  const { layoutMode } = editStore;

  console.log(editStore, layoutMode);
  if (layoutMode === LayoutMode.FREE) {
    return <FreeLayoutRender componentInstances={componentInstances} />;
  }

  return (
    <StreamLayoutRender
      mountTarget={mountTarget}
      componentInstances={componentInstances}
      containerComponentInstance={containerComponentInstance}
    />
  );
}

export const LayoutRender = observer(ILayoutRender);
