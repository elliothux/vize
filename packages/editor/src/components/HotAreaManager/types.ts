import { PX } from 'types';

export interface IHotAreaPosition {
  x: PX;
  y: PX;
}

export interface IHotAreaSize {
  width: PX;
  height: PX;
}

export interface IHotArea {
  key: number;
  position: IHotAreaPosition;
  size: IHotAreaSize;
}

export enum MoveHotAreaDirection {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  CENTER,
  HORIZONTALLY_CENTER,
  VERTICAL_CENTER,
}
