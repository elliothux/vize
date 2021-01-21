import { ComponentInstanceDSL, GlobalMeta, PageRouter, PluginInstanceDSL } from '../../../types';

export interface AppRenderProps {
  global: object;
  meta: GlobalMeta;
  componentInstances: ComponentInstanceDSL[];
  sharedComponentInstances?: ComponentInstanceDSL[];
  pluginInstances: PluginInstanceDSL[];
  router: PageRouter;
}
