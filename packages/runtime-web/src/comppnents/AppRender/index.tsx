import * as React from 'react';
import { ComponentInstanceDSL, MaterialsPlugin, PluginInstanceDSL } from '../../../types';
import { executePlugins } from '../../utils';

interface Props {
  global: object;
  meta: object;
  actionsMaterialMap: { [key: string]: Function };
  componentsMaterialMap: { [key: string]: React.ComponentType<any> };
  componentInstances: ComponentInstanceDSL[];
  pluginsMaterialMap: { [key: number]: MaterialsPlugin };
  pluginInstances: PluginInstanceDSL[];
}

export function AppRender({
  global,
  meta,
  componentsMaterialMap,
  componentInstances,
  pluginInstances,
  pluginsMaterialMap,
}: Props) {
  React.useEffect(() => executePlugins(pluginInstances, pluginsMaterialMap), []);

  return (
    <ComponentInstances
      global={global}
      meta={meta}
      componentInstances={componentInstances}
      componentsMaterialMap={componentsMaterialMap}
    />
  );
}

function ComponentInstances({
  global,
  meta,
  componentsMaterialMap,
  componentInstances,
}: Pick<Props, 'global' | 'meta' | 'componentsMaterialMap' | 'componentInstances'>) {
  return (
    <>
      {componentInstances.map(instance => {
        const { key, component, data, style, commonStyle, children } = instance;
        let childrenNode;
        if (children?.length) {
          childrenNode = (
            <ComponentInstances
              global={global}
              meta={meta}
              componentsMaterialMap={componentsMaterialMap}
              componentInstances={children}
            />
          );
        }

        const ViewRender = componentsMaterialMap[component];
        return (
          <ViewRender
            key={key}
            componentKey={key}
            data={data}
            style={style}
            commonStyle={commonStyle}
            instance={instance}
            meta={[]}
            hotAreas={null}
          >
            {childrenNode}
          </ViewRender>
        );
      })}
    </>
  );
}
