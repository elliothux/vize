import { GlobalMeta, GlobalStyle, LayoutMode } from './global';
import { PageInstance, PageMode } from './pages';
import { ComponentInstance, HotArea } from './component';
import { PluginInstance } from './plugins';
import { InstanceKeyType } from './materials';

export type HotAreaDSL = Omit<HotArea, 'parent'>;

export interface ComponentInstanceDSL extends Omit<ComponentInstance, 'parent'> {
  children?: ComponentInstanceDSL[];
  hotarea?: HotAreaDSL;
}

export type PluginInstanceDSL = PluginInstance;

export interface PageDSL extends Omit<PageInstance, 'isNameEditing'> {
  componentInstances: ComponentInstanceDSL[];
  pluginInstances?: PluginInstanceDSL[];
}

export type DSL = Readonly<{
  pageKey: string;
  container: {
    lib: string;
    name: string;
    entry: string;
  };
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
      [InstanceKeyType.Page]: number;
      [InstanceKeyType.Component]: number;
      [InstanceKeyType.HotArea]: number;
      [InstanceKeyType.Plugin]: number;
      [InstanceKeyType.Action]: number;
    };
  };
}>;
