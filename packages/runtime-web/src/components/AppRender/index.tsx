import * as React from 'react';
import { executePlugins } from '../../libs';
import { AppRenderProps } from './types';
import { ComponentInstances } from '../ComponentInstances';

export function AppRender({ global, meta, componentInstances, pluginInstances, router }: AppRenderProps) {
  React.useEffect(() => executePlugins(pluginInstances, meta, global, router), []);

  return <ComponentInstances global={global} meta={meta} router={router} componentInstances={componentInstances} />;
}
