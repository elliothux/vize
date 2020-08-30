import { GlobalMeta, GlobalStyle, LayoutMode } from './global';
import { PageInstance, PageMode } from './pages';
import { ComponentInstance } from './component';
import { PluginInstance } from './plugins';

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
    globalProps: object;
    globalStyle: GlobalStyle;
    metaInfo: GlobalMeta;
  };
  pageInstances: PageDSL[];
  pluginInstances?: PluginInstanceDSL[];
}>;
