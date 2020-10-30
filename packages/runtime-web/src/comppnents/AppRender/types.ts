import { ComponentInstanceDSL, PluginInstanceDSL } from '../../../types';

export interface AppRenderProps {
  global: object;
  meta: object;
  componentInstances: ComponentInstanceDSL[];
  pluginInstances: PluginInstanceDSL[];
}
