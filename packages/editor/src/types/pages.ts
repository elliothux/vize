import { ComponentInstance } from "./component";
import { PluginInstance } from "./plugins";
import { ActionInstance } from "./actions";

export interface PageInstance {
  key: Readonly<number>;
  name: string;
  path: string;
  isHome: boolean;
  isNameEditing: boolean;
}

export interface PageData {
  global: object;
  components: ComponentInstance[];
  plugins: PluginInstance[];
  actions: ActionInstance[];
}
