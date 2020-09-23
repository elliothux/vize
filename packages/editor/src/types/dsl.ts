import { GlobalMeta, GlobalStyle, LayoutMode } from './global';
import { PageInstance, PageMode } from './pages';
import { ComponentInstance } from './component';
import { PluginInstance } from './plugins';
import { KeyType } from '../utils';

export interface ComponentInstanceDSL extends Omit<ComponentInstance, 'parent'> {
  children?: ComponentInstanceDSL[];
}

export type PluginInstanceDSL = PluginInstance;

export interface PageDSL extends Omit<PageInstance, 'isNameEditing'> {
  componentInstances: ComponentInstanceDSL[];
  pluginInstances?: PluginInstanceDSL[];
}

export type DSL = Readonly<{
  global: {
    layoutMode: LayoutMode;
    pageMode: PageMode;
    metaInfo: GlobalMeta;
    globalProps: object;
    globalStyle: GlobalStyle;
  };
  pageInstances: PageDSL[];
  pluginInstances?: PluginInstanceDSL[];
  editInfo: {
    maxKeys: {
      [KeyType.Page]: number;
      [KeyType.Component]: number;
      [KeyType.HotArea]: number;
      [KeyType.Plugin]: number;
      [KeyType.Action]: number;
    };
  };
}>;
