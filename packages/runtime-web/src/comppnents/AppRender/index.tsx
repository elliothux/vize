import * as React from 'react';
import { executePlugins } from '../../libs';
import { Props } from './types';
import { ComponentInstances } from './ComponentInstances';

export function AppRender({ global, meta, componentInstances, pluginInstances }: Props) {
  React.useEffect(() => executePlugins(pluginInstances, meta, global), []);

  return <ComponentInstances global={global} meta={meta} componentInstances={componentInstances} />;
}
