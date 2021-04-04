import { ComponentInstance, GlobalMeta, PageRouter, PluginInstance } from '@vize/types';

export interface AppRenderProps {
  global: object;
  meta: GlobalMeta;
  componentInstances: ComponentInstance[];
  sharedComponentInstances?: ComponentInstance[];
  pluginInstances: PluginInstance[];
  router: PageRouter;
}
