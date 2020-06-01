import * as React from 'react';
import { ComponentItem } from 'components/ComponentItem';
import { Position, ResizableDelta, Rnd } from 'react-rnd';
import { ComponentInstance, ComponentSize } from 'types';
import { componentsStore, selectStore } from '../../../states';
import { DraggableData, DraggableEvent } from 'react-draggable';
import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { ResizeDirection } from 're-resizable';

interface Props {
    index: number;
    instance: ComponentInstance;
}

function IDraggableComponentItem({ instance, index }: Props) {
    const { position, size } = instance.layout!;

    const style = useMemo(() => ({ zIndex: index }), [index]);

    const onMove = useCallback(
        (e: DraggableEvent, { x, y }: DraggableData) => {
            return componentsStore.moveComponentInstance(instance.key, { x, y });
        },
        [instance.key],
    );

    const onResize = useCallback(
        (
            e: MouseEvent | TouchEvent,
            dir: ResizeDirection,
            ref: HTMLDivElement,
            delta: ResizableDelta,
            position: Position,
        ) => {
            const size: ComponentSize = {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
            };
            return componentsStore.resizeComponentInstance(instance.key, position, size);
        },
        [instance.key],
    );

    return (
        <Rnd position={position} size={size} style={style} onDragStop={onMove} onResizeStop={onResize}>
            <ComponentItem instance={instance} currentSelectedKey={selectStore.componentKey} />
        </Rnd>
    );
}

export const DraggableComponentItem = observer(IDraggableComponentItem);
