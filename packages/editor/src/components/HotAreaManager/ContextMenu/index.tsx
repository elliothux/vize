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
import { Trans } from 'react-i18next';

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
        <span>
          <Trans>delete</Trans>
        </span>
      </Item>
      <Item onClick={onCopy}>
        <FiCopy />
        <span>
          <Trans>duplicate</Trans>
        </span>
      </Item>
      <Separator />
      <Item onClick={() => onMove(MoveHotAreaDirection.CENTER)}>
        <FiCrosshair />
        <span>
          <Trans>align</Trans>
        </span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.HORIZONTALLY_CENTER)}>
        <FiMoreHorizontal />
        <span>
          <Trans>align horizontally</Trans>
        </span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.VERTICAL_CENTER)}>
        <FiMoreVertical />
        <Trans>align vertically</Trans>
      </Item>
      <Separator />
      <Item onClick={() => onMove(MoveHotAreaDirection.TOP)}>
        <FiChevronsUp />
        <span>
          <Trans>move to top</Trans>
        </span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.BOTTOM)}>
        <FiChevronsDown />
        <span>
          <Trans>move to bottom</Trans>
        </span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.LEFT)}>
        <FiChevronsLeft />
        <span>
          <Trans>move to left</Trans>
        </span>
      </Item>
      <Item onClick={() => onMove(MoveHotAreaDirection.RIGHT)}>
        <FiChevronsRight />
        <span>
          <Trans>move to right</Trans>
        </span>
      </Item>
    </Menu>
  );
}
