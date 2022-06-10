import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { ComponentItem } from 'components/ComponentItem';
import { Position, ResizableDelta, Rnd } from 'react-rnd';
import { ComponentInstance, ComponentSize } from '@vize/types';
import { componentsStore, pagesStore, selectStore } from 'states';
import { DraggableData, DraggableEvent } from 'react-draggable';
import { ResizeDirection } from 're-resizable';

interface Props {
  index: number;
  instance: ComponentInstance;
}

function IDraggableComponentItem({ instance, index }: Props) {
  const { selectMode, selectModeSelectedComponent, pageIndex } = selectStore;
  const { position, size } = instance.layout!;
  const { pages } = pagesStore;

  const style = useMemo(() => ({ zIndex: index }), [index]);

  const onMove = useCallback(
    (e: DraggableEvent, { x, y }: DraggableData) => {
      componentsStore.dragMoveComponentInstance(instance.key, { x, y });
    },
    [instance.key],
  );

  const onResize = useCallback(
    (e: MouseEvent | TouchEvent, dir: ResizeDirection, ref: HTMLElement, delta: ResizableDelta, position: Position) => {
      const size: ComponentSize = {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      };
      return componentsStore.resizeComponentInstance(instance.key, position, size);
    },
    [instance.key],
  );

  return (
    <Rnd
      position={position}
      size={size}
      style={style}
      onDragStop={onMove}
      onResize={onResize}
      maxWidth="100%"
      dragGrid={[1, 1]}
      resizeGrid={[1, 1]}
      bounds="window"
    >
      <ComponentItem
        instance={instance}
        currentSelectedType={selectStore.selectType}
        currentSelectedKey={selectStore.componentKey}
        currentSelectedContainerKey={selectStore.containerComponentKey}
        selectMode={selectMode}
        selectModeSelectedComponent={selectModeSelectedComponent}
        isCurrentSelectedContainerShared={false}
        pages={pages}
        currentPageIndex={pageIndex}
      />
    </Rnd>
  );
}

export const DraggableComponentItem = observer(IDraggableComponentItem);
