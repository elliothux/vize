import * as React from 'react';
import { MaterialsPluginMeta, Maybe } from 'types';
import { observer } from 'mobx-react';
import { materialsStore, pluginsStore } from 'states';
import { useCallback, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { FiLayers } from 'react-icons/fi';
import { useUnmount } from 'react-use';

interface Props {
  plugin: Maybe<[number, Maybe<string>]>;
  setPlugin: (component: Maybe<[number, Maybe<string>]>) => void;
}

const { Option: SelectOption } = Select;

function IPluginTargetSelector({ plugin, setPlugin }: Props) {
  const { pluginsInstances } = pluginsStore;
  const [pluginKey, eventName] = plugin || [];

  const plugins = useMemo(
    () =>
      pluginsInstances
        .map<[number, MaterialsPluginMeta]>(({ plugin, key }) => [key, materialsStore.getPluginMeta(plugin)])
        .filter(([, { onEvents }]) => !!onEvents?.length),
    [pluginsInstances.length],
  );

  const currentPlugin = useMemo(() => {
    if (!pluginKey) {
      return null;
    }
    return plugins.find(([key]) => key === pluginKey)![1];
  }, [plugins, pluginKey]);

  useEffect(() => {
    if (!pluginsInstances.find(i => i.key === pluginKey)) {
      setPlugin(null);
    }
  }, [pluginsInstances]);

  useUnmount(() => setPlugin(null));

  const onChangePlugin = useCallback((key: number) => setPlugin([key, null]), []);
  const onChangeEvent = useCallback((event: string) => setPlugin([pluginKey!, event]), [pluginKey]);

  return (
    <>
      <div className="event-form-prop-item">
        <span>目标插件:</span>
        <Select
          value={pluginKey || undefined}
          onChange={onChangePlugin}
          className="event-form-selector"
          dropdownClassName="event-form-selector-options"
        >
          {plugins.map(([key, { info: { name } }]) => (
            <SelectOption value={key} key={key}>
              <FiLayers />
              {name}
            </SelectOption>
          ))}
        </Select>
      </div>

      {currentPlugin ? (
        <div className="event-form-prop-item">
          <span>执行动作:</span>
          <Select
            value={eventName || undefined}
            onChange={onChangeEvent}
            className="event-form-selector"
            dropdownClassName="event-form-selector-options"
          >
            {currentPlugin.onEvents!.map(({ eventName, displayName }) => (
              <SelectOption value={eventName} key={eventName}>
                <FiLayers />
                {displayName}
              </SelectOption>
            ))}
          </Select>
        </div>
      ) : null}
    </>
  );
}

export const PluginTargetSelector = observer(IPluginTargetSelector);
