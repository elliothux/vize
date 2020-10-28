import * as React from 'react';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronsDown,
  FiChevronsUp,
  FiCopy,
  FiDelete,
  FiMoreHorizontal,
  FiMoreVertical,
  FiCrosshair,
} from 'react-icons/fi';
import { animation, Item, Menu, Separator, theme } from 'react-contexify';
import { MoveHotAreaDirection } from 'components/HotAreaManager/types';

interface Props {
  id: number;
  onDelete: () => void;
  onCopy: () => void;
  onMove: (direction: MoveHotAreaDirection) => void;
}

export function ContextMenu({ id, onDelete, onCopy, onMove }: Props) {
  return (
    <Menu id={id} theme={theme.dark} animation={animation.fade}>
      <Item onClick={onDelete}>
        <FiDelete />
        <span>删除</span>
      </Item>
      <Item onClick={onCopy}>
        <FiCopy />
        <span>复制</span>
      </Item>
      <Separator />
      <Item onClick={() => onMove(MoveHotAreaDirection.CENTER)}>
        <FiCrosshair />
        <span>居中</span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.HORIZONTALLY_CENTER)}>
        <FiMoreHorizontal />
        <span>水平居中</span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.VERTICAL_CENTER)}>
        <FiMoreVertical />
        <span>垂直居中</span>
      </Item>
      <Separator />
      <Item onClick={() => onMove(MoveHotAreaDirection.TOP)}>
        <FiChevronsUp />
        <span>移到最上</span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.BOTTOM)}>
        <FiChevronsDown />
        <span>移到最下</span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.LEFT)}>
        <FiChevronsLeft />
        <span>移到最左</span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.RIGHT)}>
        <FiChevronsRight />
        <span>移到最右</span>
      </Item>
    </Menu>
  );
}
