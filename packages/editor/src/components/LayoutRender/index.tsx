import * as React from 'react';
import { observer } from 'mobx-react';
import { editStore } from 'states';
import { ComponentInstance, LayoutMode } from 'types';
import { StreamLayoutRender } from './StreamLayoutRender';
import { FreeLayoutRender } from './FreeLayoutRender';

interface Props {
  mountTarget?: HTMLDivElement;
  componentInstances: ComponentInstance[];
  sharedComponentInstances?: ComponentInstance[];
  containerComponentInstance?: ComponentInstance;
}

function ILayoutRender({
  componentInstances,
  mountTarget,
  containerComponentInstance,
  sharedComponentInstances,
}: Props) {
  const { layoutMode } = editStore;

  if (layoutMode === LayoutMode.FREE) {
    return <FreeLayoutRender componentInstances={componentInstances} />;
  }

  return (
    <StreamLayoutRender
      mountTarget={mountTarget}
      componentInstances={componentInstances}
      containerComponentInstance={containerComponentInstance}
      sharedComponentInstances={sharedComponentInstances}
    />
  );
}

export const LayoutRender = observer(ILayoutRender);
