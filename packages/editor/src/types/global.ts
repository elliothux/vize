import { Maybe } from './helper';
import { BackgroundStyle, BorderStyle, DistanceStyle } from './styles';

export enum LayoutMode {
  STREAM = 'stream',
  FREE = 'free',
}

export interface GlobalMeta {
  title: string;
  desc: string;
  duration: Maybe<[number, number]>;
  expiredJump: string;
}

export interface GlobalStyle {
  margin: DistanceStyle;
  padding: DistanceStyle;
  border: BorderStyle;
  background: BackgroundStyle;
}
