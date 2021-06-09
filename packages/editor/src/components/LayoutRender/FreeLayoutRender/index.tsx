import * as React from 'react';
import { editStore } from 'states';
import { observer } from 'mobx-react';
import { ComponentInstance } from 'types';
import { DraggableComponentItem } from './DraggableComponentItem';
import iframeStyle from './index.iframe.scss';

editStore.setIframeStyle('FreeLayoutRender', iframeStyle);

interface Props {
  componentInstances: ComponentInstance[];
}

// TODO: free layout
function IFreeLayoutRender({ componentInstances }: Props) {
  return (
    <>
      {componentInstances.map((instance, index) => (
        <DraggableComponentItem key={instance.key} index={index} instance={instance} />
      ))}
    </>
  );
}

export const FreeLayoutRender = observer(IFreeLayoutRender);
