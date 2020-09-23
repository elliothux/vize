export type PX = number;
export type Percent = number;
export type Color = string;
export type URL = string;

export interface CommonStyleMeta {
  size?: SizeStyle | boolean;
  transform?: TransformStyle | boolean;
  text?: TextStyle | boolean;
  border?: BorderStyle | boolean;
  background?: BackgroundStyle | boolean;
  zIndex?: number | boolean;
  margin?: DistanceStyleWithAuto | boolean;
  padding?: DistanceStyle | boolean;
  position?: DistanceStyle | boolean;
}

export interface CommonStyle {
  size?: SizeStyle;
  transform?: TransformStyle;
  text?: TextStyle;
  border?: BorderStyle;
  background?: BackgroundStyle;
  zIndex?: ZIndexStyle;
  margin?: DistanceStyleWithAuto;
  padding?: DistanceStyle;
  position?: PositionStyle | true;
}

export type ZIndexStyle = number | true;

export type PositionStyle = IPositionStyle | true;

export interface IPositionStyle extends Partial<DistanceStyle> {
  outset?: FixedOutset;
}

export interface MarginAndPaddingStyle {
  margin?: DistanceStyleWithAuto;
  padding?: DistanceStyle;
}

export interface SizeStyle {
  autoWidth: boolean;
  width: PX;
  autoHeight: boolean;
  height: PX;
}

export interface TransformStyle {
  rotate: number;
  opacity: number;
  scale: number;
  radius: PX;
}

export interface TextStyle {
  color: Color;
  fontSize: PX;
  lineHeight: PX;
  textAlign: 'left' | 'center' | 'right';
  weight: 'lighter' | 'bolder' | 'normal';
}

export interface BorderStyle {
  type: 'none' | 'solid' | 'dashed';
  color: Color;
  width: PX;
}

export interface BackgroundStyle {
  color: Color;
  image: URL;
  size: string;
  repeat: string;
  position: string;
}

export interface DistanceStyle {
  top: PX;
  right: PX;
  bottom: PX;
  left: PX;
}

export interface DistanceStyleWithAuto {
  top: PX;
  right: PX | 'auto';
  bottom: PX;
  left: PX | 'auto';
}

export enum FixedOutset {
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomLeft = 'BottomLeft',
  BottomRight = 'BottomRight',
}
