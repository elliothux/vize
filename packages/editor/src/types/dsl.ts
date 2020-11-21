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

export interface EditInfoDSL {
  layoutMode: LayoutMode;
  pageMode: PageMode;
  maxKeys?: {
    [InstanceKeyType.Page]: number;
    [InstanceKeyType.Component]: number;
    [InstanceKeyType.HotArea]: number;
    [InstanceKeyType.Plugin]: number;
    [InstanceKeyType.Action]: number;
  };
}

export interface GlobalDSL {
  metaInfo: GlobalMeta;
  globalProps: object;
  globalStyle: GlobalStyle;
}

export interface PageDSL extends Omit<PageInstance, 'isNameEditing'> {
  componentInstances: ComponentInstanceDSL[];
  pluginInstances?: PluginInstanceDSL[];
  global?: GlobalDSL;
}

export type DSL = Readonly<{
  pageKey: string;
  container: {
    lib: string;
    name: string;
  };
  global?: GlobalDSL;
  pageInstances: PageDSL[];
  pluginInstances?: PluginInstanceDSL[];
  sharedComponentInstance?: ComponentInstanceDSL[];
  editInfo: EditInfoDSL;
}>;
