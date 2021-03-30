import { GlobalMeta, LayoutMode } from './global';
import { PageInstance, PageMode } from './pages';
import { ComponentInstance, HotArea } from './component';
import { PluginInstance } from './plugins';
import { InstanceKeyType } from './materials';
import { EventInstance } from './events';

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

export type PageDSL = PageInstance;

export type EventInstanceDSL = EventInstance;

export type DSL = Readonly<{
  pageKey: string;
  container: {
    lib: string;
    name: string;
  };
  editInfo: EditInfoDSL;
  meta: GlobalMeta;
  data: object;
  style: object;
  events: EventInstanceDSL[];
  pageInstances: PageDSL[];
  sharedComponentInstances?: ComponentInstanceDSL[];
  sharedPluginInstances?: ComponentInstanceDSL[];
}>;
