import * as React from 'react';
import { observer } from 'mobx-react';
import { globalStore } from 'states';
import { LayoutMode } from 'types';
import { StreamLayoutRender } from './StreamLayoutRender';
import { FreeLayoutRender } from './FreeLayoutRender';

interface Props {
    mountTarget: HTMLDivElement;
}

function ILayoutRender({ mountTarget }: Props) {
    const { layoutMode } = globalStore;

    if (layoutMode === LayoutMode.STREAM) {
        return <StreamLayoutRender mountTarget={mountTarget} />;
    }

    // TODO
    return <FreeLayoutRender />;
}

export const LayoutRender = observer(ILayoutRender);
