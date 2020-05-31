import * as React from 'react';
import { ComponentItem } from 'components/ComponentItem';
import { Rnd } from 'react-rnd';
import { ComponentInstance } from 'types';
import { selectStore } from '../../../states';

interface Props {
    index: number;
    instance: ComponentInstance;
}

export function DraggableComponentItem({ instance, index }: Props) {
    const { position, size } = instance.layout!;
    return (
        <Rnd position={position}>
            <ComponentItem instance={instance} currentSelectedKey={selectStore.componentKey} />
        </Rnd>
    );
}
