import * as React from 'react';
import * as R from 'ramda';
import { preventSyntheticEvent } from 'utils';
import classnames from 'classnames';
import { Rnd } from 'react-rnd';
import { IHotArea, IHotAreaPosition, IHotAreaSize, MoveHotAreaDirection } from './types';
import { showContextMenu } from './utils';
import { ContextMenu } from './ContextMenu';

export interface HotAreaProps {
  hotArea: IHotArea;
  index: number;
  setPosition: (index: number, position: IHotAreaPosition) => void;
  setSizeAndPosition: (index: number, size: IHotAreaSize, position?: IHotAreaPosition) => void;
  deleteHotArea: (index: number) => void;
  copyHotArea: (index: number) => void;
  moveHotArea: (index: number, direction: MoveHotAreaDirection) => void;
  onClick: () => void;
  activated: boolean;
}

export function HotAreaItem({
  hotArea,
  index,
  setPosition,
  setSizeAndPosition,
  deleteHotArea,
  copyHotArea,
  moveHotArea,
  onClick,
  activated,
}: HotAreaProps) {
  const { key, position, size } = hotArea;
  return (
    <React.Fragment>
      <Rnd
        className={classnames('hot-area-item', { activated })}
        bounds="parent"
        size={size}
        position={position}
        onMouseDown={preventSyntheticEvent}
        onMouseUp={preventSyntheticEvent}
        onDragStart={onClick}
        onResizeStart={onClick}
        onDragStop={(e, { x, y }) => {
          preventSyntheticEvent(e as Event);
          setPosition(index, { x, y });
        }}
        onResize={(e, direction, ref, delta, { x, y }) => {
          const { width, height } = ref.getBoundingClientRect();
          preventSyntheticEvent(e);
          setSizeAndPosition(index, { width, height }, { x, y });
        }}
      >
        <div onContextMenu={R.partialRight(showContextMenu, [key])} onClick={onClick} />
      </Rnd>
      <ContextMenu
        id={key}
        onDelete={() => deleteHotArea(index)}
        onCopy={() => copyHotArea(index)}
        onMove={R.partial(moveHotArea, [index])}
      />
    </React.Fragment>
  );
}
