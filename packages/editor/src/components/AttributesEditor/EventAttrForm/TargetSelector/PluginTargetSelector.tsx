import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EventTargetType,
  EventTriggerName,
  MaterialsPluginMeta,
  Maybe,
  PluginEventTarget,
  PluginInstance,
} from 'types';
import { observer } from 'mobx-react';
import { eventStore, materialsStore, pluginsStore } from 'states';
import { Button, Select } from 'antd';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { useUnmount } from 'react-use';

interface Props {
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

const { Option: SelectOption } = Select;

function IPluginTargetSelector({ trigger, setTrigger }: Props) {
  const { pluginsInstances } = pluginsStore;

  const [target, setTarget] = useState<Maybe<Partial<Omit<PluginEventTarget, 'type'>>>>(null);
  const plugins = useMemo(() => filterPluginInstance(pluginsInstances), [pluginsInstances.length]);

  const { eventName, key: pluginKey } = target || {};

  const currentPlugin = useMemo(() => {
    if (!pluginKey) {
      return null;
    }
    return plugins.find(([key]) => key === pluginKey)![1];
  }, [plugins, pluginKey]);

  useEffect(() => {
    if (!pluginsInstances.find(i => i.key === pluginKey)) {
      setTarget(null);
    }
  }, [pluginsInstances]);

  useUnmount(() => setTarget(null));

  const onChangePlugin = useCallback((key: number) => setTarget({ key }), []);
  const onChangeEvent = useCallback((eventName: string) => setTarget({ key: pluginKey, eventName }), [pluginKey]);
  const onAddAction = useCallback(() => {
    eventStore.addEventInstance(trigger!, { type: EventTargetType.PLUGIN, eventName: eventName!, key: pluginKey! });
    setTarget(null);
    setTrigger(null);
  }, [eventName, pluginKey]);

  const disabled = !(trigger && pluginKey && eventName);

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

      <Button disabled={disabled} type="primary" className="event-form-target-selector-add" onClick={onAddAction}>
        <FiPlus />
        <span>添加</span>
      </Button>
    </>
  );
}

function filterPluginInstance(pluginInstances: PluginInstance[]) {
  return pluginInstances
    .map<[number, MaterialsPluginMeta]>(({ plugin, key }) => [key, materialsStore.getPluginMeta(plugin)])
    .filter(([, { onEvents }]) => !!onEvents?.length);
}

export const PluginTargetSelector = observer(IPluginTargetSelector);
