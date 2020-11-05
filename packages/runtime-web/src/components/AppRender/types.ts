import { ComponentInstanceDSL, PageRouter, PluginInstanceDSL } from '../../../types';

export interface AppRenderProps {
  global: object;
  meta: object;
  componentInstances: ComponentInstanceDSL[];
  sharedComponentInstances?: ComponentInstanceDSL[];
  pluginInstances: PluginInstanceDSL[];
  router: PageRouter;
}
