import * as React from 'react';
import { globalStore } from 'states';
import { observer } from 'mobx-react';
import { DraggableComponentItem } from './DraggableComponentItem';
import { ComponentInstance } from '../../../types';
import iframeStyle from './index.iframe.scss';

globalStore.setIframeStyle('FreeLayoutRender', iframeStyle);

interface Props {
  componentInstances: ComponentInstance[];
}

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
