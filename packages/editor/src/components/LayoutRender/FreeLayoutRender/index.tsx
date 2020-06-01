import * as React from 'react';
import { componentsStore, globalStore } from 'states';
import { observer } from 'mobx-react';
import { DraggableComponentItem } from './DraggableComponentItem';

import iframeStyle from './index.iframe.scss';

globalStore.setIframeStyle('FreeLayoutRender', iframeStyle);

interface Props {
    mountTarget: HTMLDivElement;
    renderContext: Window;
}

function IFreeLayoutRender({}: Props) {
    const { componentInstances } = componentsStore;

    return (
        <>
            {componentInstances.map((instance, index) => (
                <DraggableComponentItem key={instance.key} index={index} instance={instance} />
            ))}
        </>
    );
}

export const FreeLayoutRender = observer(IFreeLayoutRender);
