import { Percent } from './styles';
import { EventInstance } from './events';
import { MaterialsComponentMeta } from './component';

export interface HotAreaPosition {
  x: Percent;
  y: Percent;
}

export interface HotAreaSize {
  width: Percent;
  height: Percent;
}

export interface HotAreaParamsData {
  key: number;
  position: HotAreaPosition;
  size: HotAreaSize;
  parent: MaterialsComponentMeta;
}

export interface HotArea {
  key: number;
  position: HotAreaPosition;
  size: HotAreaSize;
  events: EventInstance[];
}
