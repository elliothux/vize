import * as React from 'react';
import { ComponentInstanceDSL, PluginInstanceDSL } from '../types';

interface Props {
  global: object;
  meta: object;
  actionsMaterialMap: { [key: string]: Function };
  componentsMaterialMap: { [key: string]: React.ComponentType };
  componentInstances: ComponentInstanceDSL[];
  pluginsMaterialMap: { [key: number]: Function };
  pluginInstances: PluginInstanceDSL[];
}

export function AppRender({ componentInstances, pluginInstances }: Props) {
  return <div>111</div>;
}
