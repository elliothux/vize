import * as React from 'react';
import { contextMenu } from 'react-contexify';
import { generateKey, KeyType, preventSyntheticEvent } from 'utils';
import { HotArea, Maybe, Percent, PX } from 'types';
import { MoveHotAreaDirection, IHotAreaPosition, IHotAreaSize, IHotArea } from './types';

export interface ImgInfo {
  width: number;
  height: number;
  left: number;
  top: number;
}

function transformHotAreaFromPxToPercent(hotArea: IHotArea[], { width, height }: ImgInfo): HotArea[] {
  const transformX = (px: PX): Percent => (px / width) * 100;
  const transformY = (px: PX): Percent => (px / height) * 100;

  return hotArea.map(({ position: { x, y }, size: { width, height }, key }) => ({
    key,
    position: { x: transformX(x), y: transformY(y) },
    size: { width: transformX(width), height: transformY(height) },
    actions: [],
  }));
}

function transformHotAreaFromPercentToPx(hotArea: HotArea[], { width, height }: ImgInfo): IHotArea[] {
  const transformX = (percent: Percent): PX => (width * percent) / 100;
  const transformY = (percent: Percent): PX => (height * percent) / 100;

  return hotArea.map(({ position: { x, y }, size: { width, height }, key }) => ({
    key,
    position: { x: transformX(x), y: transformY(y) },
    size: { width: transformX(width), height: transformY(height) },
  }));
}

function createHotArea(position: IHotAreaPosition, size: IHotAreaSize): IHotArea {
  return {
    key: generateKey(KeyType.HotArea),
    position,
    size,
  };
}

function copyHotArea({ position: { x, y }, size }: IHotArea): IHotArea {
  return {
    key: generateKey(KeyType.HotArea),
    position: { x: x + 10, y: y + 10 },
    size,
  };
}

function showContextMenu(e: React.MouseEvent<HTMLDivElement>, key: number) {
  preventSyntheticEvent(e);
  e.persist();
  contextMenu.show({
    id: key,
    event: e,
  });
}

function getMousePosition<T extends HTMLElement = HTMLDivElement>(
  event: React.MouseEvent,
  { top, left }: ImgInfo,
): IHotAreaPosition {
  const { clientX, clientY } = event;
  return { x: clientX - left, y: clientY - top };
}

function getMovedHotArea(direction: MoveHotAreaDirection, hotArea: IHotArea, { width, height }: ImgInfo): IHotArea {
  const { position: p, size } = hotArea;
  const [maxX, maxY] = [width - size.width, height - size.height];

  let position: Maybe<IHotAreaPosition> = null;
  switch (direction) {
    case MoveHotAreaDirection.LEFT:
      position = { ...p, x: 0 };
      break;
    case MoveHotAreaDirection.RIGHT:
      position = { ...p, x: maxX };
      break;
    case MoveHotAreaDirection.TOP:
      position = { ...p, y: 0 };
      break;
    case MoveHotAreaDirection.BOTTOM:
      position = { ...p, y: maxY };
      break;
    case MoveHotAreaDirection.CENTER:
      position = { x: maxX / 2, y: maxY / 2 };
      break;
    case MoveHotAreaDirection.HORIZONTALLY_CENTER:
      position = { ...p, x: maxX / 2 };
      break;
    case MoveHotAreaDirection.VERTICAL_CENTER:
      position = { ...p, y: maxY / 2 };
      break;
  }

  return { ...hotArea, position: position as IHotAreaPosition };
}

export {
  getMousePosition,
  createHotArea,
  copyHotArea,
  showContextMenu,
  getMovedHotArea,
  transformHotAreaFromPxToPercent,
  transformHotAreaFromPercentToPx,
};
