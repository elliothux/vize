import * as React from 'react';
import { observer } from 'mobx-react';
import { globalStore } from 'states';
import { LayoutMode } from 'types';
import { StreamLayoutRender } from './StreamLayoutRender';

interface Props {
    mountTarget: HTMLDivElement;
}

function ILayoutRender({ mountTarget }: Props) {
    const { layoutMode } = globalStore;

    if (layoutMode === LayoutMode.STREAM) {
        return <StreamLayoutRender mountTarget={mountTarget} />;
    }

    // TODO
    return <StreamLayoutRender mountTarget={mountTarget} />;
}

export const LayoutRender = observer(ILayoutRender);
