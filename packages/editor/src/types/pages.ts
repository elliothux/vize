import { ComponentInstance } from './component';

export interface PageInstance {
  key: Readonly<number>;
  name: string;
  path: string;
  isHome: boolean;
  isNameEditing: boolean;
}

export interface PageData {
  components: ComponentInstance[];
  // plugins: PluginInstance[];
  // events: EventInstance[];
}
