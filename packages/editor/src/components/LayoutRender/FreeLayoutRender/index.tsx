import * as React from 'react';
import { componentsStore } from 'states';
import { observer } from 'mobx-react';
import { DraggableComponentItem } from './DraggableComponentItem';

function IFreeLayoutRender() {
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
