import { ComponentInstanceDSL, PluginInstanceDSL } from '../../../types';

export interface Props {
  global: object;
  meta: object;
  componentInstances: ComponentInstanceDSL[];
  pluginInstances: PluginInstanceDSL[];
}
