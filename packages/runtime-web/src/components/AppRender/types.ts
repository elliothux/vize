import { ComponentInstanceDSL, GlobalMeta, PageRouter, PluginInstanceDSL } from '@vize/types';

export interface AppRenderProps {
  global: object;
  meta: GlobalMeta;
  componentInstances: ComponentInstanceDSL[];
  sharedComponentInstances?: ComponentInstanceDSL[];
  pluginInstances: PluginInstanceDSL[];
  router: PageRouter;
}
