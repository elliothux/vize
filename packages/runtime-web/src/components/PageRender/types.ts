import { ComponentInstance, GlobalMeta, PageRouter, PluginInstance } from '../../../types';

export interface PageRenderProps {
  router: PageRouter;
  meta: GlobalMeta;
  globalData: object;
  globalStyle: object;
  pageData: object;
  pageStyle: object;
  componentInstances: ComponentInstance[];
  pluginInstances: PluginInstance[];
}
