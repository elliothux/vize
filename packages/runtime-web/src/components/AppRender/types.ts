import { ComponentInstance, GlobalMeta, PageRouter, PluginInstance } from '../../../types';

export interface AppRenderProps {
  meta: GlobalMeta;
  globalData: object;
  pageData: object;
  componentInstances: ComponentInstance[];
  sharedComponentInstances?: ComponentInstance[];
  pluginInstances: PluginInstance[];
  router: PageRouter;
}
