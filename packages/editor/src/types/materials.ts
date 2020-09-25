import { MaterialsComponent, MaterialsComponentMeta } from './component';
import { MaterialsPlugin, MaterialsPluginMeta } from './plugins';
import { MaterialsActionMeta, MaterialsAction } from './action';

export interface MaterialsInfo {
  name: string;
  desc: string;
  author: string;
  tags?: string[];
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

export interface MaterialsMain {
  components: {
    [name: string]: MaterialsComponent;
  };
  plugins: {
    [name: string]: MaterialsPlugin;
  };
  actions: {
    [name: string]: MaterialsAction;
  };
}

export interface RenderEntryParams {
  render: Function;
}

export type ContainerRenderEntry = (params: RenderEntryParams) => void;

export enum InstanceKeyType {
  Page = 'page',
  Component = 'component',
  HotArea = 'hot-area',
  Plugin = 'plugin',
  Action = 'action',
  ComponentAction = 'component_action',
  PluginAction = 'plugin_action',
}
