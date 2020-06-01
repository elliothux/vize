import * as React from 'react';
import { observer } from 'mobx-react';
import { globalStore } from 'states';
import { LayoutMode } from 'types';
import { StreamLayoutRender } from './StreamLayoutRender';
import { FreeLayoutRender } from './FreeLayoutRender';

interface Props {
    mountTarget: HTMLDivElement;
    renderContext: Window;
}

function ILayoutRender({ mountTarget, renderContext }: Props) {
    const { layoutMode } = globalStore;

    if (layoutMode === LayoutMode.STREAM) {
        return <StreamLayoutRender mountTarget={mountTarget} renderContext={renderContext} />;
    }

    return <FreeLayoutRender mountTarget={mountTarget} renderContext={renderContext} />;
}

export const LayoutRender = observer(ILayoutRender);
