import { ComponentInstance } from './component';
import { PluginInstance } from './plugins';
import { ActionInstance } from './actions';
import { DistanceStyle, BorderStyle, BackgroundStyle } from './styles';
import { Maybe } from './helper';

export interface PageInstance {
  key: Readonly<number>;
  name: string;
  path: string;
  isHome: boolean;
  isNameEditing: boolean;
}

export interface PageData {
  components: ComponentInstance[];
  plugins: PluginInstance[];
  actions: ActionInstance[];
}

export interface PageMeta {
  title: string;
  desc: string;
  duration: Maybe<[number, number]>;
  expiredJump: string;
}

export interface PageStyle {
  margin: DistanceStyle;
  padding: DistanceStyle;
  border: BorderStyle;
  background: BackgroundStyle;
}
