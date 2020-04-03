import { MaterialsComponentMeta } from "./component";
import { MaterialsPluginMeta } from "./plugins";
import { MaterialsActionMeta } from "./actions";

export interface MaterialsInfo {
  name: string;
  desc: string;
  author: string;
}

export interface MaterialsMeta {
  components: {
    [name: string]: MaterialsComponentMeta;
  };
  plugins: {
    [name: string]: MaterialsPluginMeta;
  };
  actions: {
    [name: string]: MaterialsActionMeta;
  };
}
