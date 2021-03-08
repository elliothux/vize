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
import { eventStore, pluginsStore } from 'states';
import { Button, Select } from 'antd';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { useUnmount } from 'react-use';
import { getMaterialsPluginMeta } from 'runtime';
import { Trans } from 'react-i18next';
import { DEFAULT_MAX_TIMEOUT } from './constant';

interface Props {
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

const { Option: SelectOption } = Select;

function IPluginTargetSelector({ trigger, setTrigger }: Props) {
  const { pluginInstances } = pluginsStore;

  const [target, setTarget] = useState<Maybe<Partial<Omit<PluginEventTarget, 'type'>>>>(null);
  const plugins = useMemo(() => filterPluginInstance(pluginInstances), [pluginInstances.length]);

  const { eventName, key: pluginKey, maxTimeout = DEFAULT_MAX_TIMEOUT } = target || {};

  const currentPlugin = useMemo(() => {
    if (!pluginKey) {
      return null;
    }
    return plugins.find(([key]) => key === pluginKey)![1];
  }, [plugins, pluginKey]);

  useEffect(() => {
    if (!pluginInstances.find(i => i.key === pluginKey)) {
      setTarget(null);
    }
  }, [pluginInstances]);

  useUnmount(() => setTarget(null));

  const onChangePlugin = useCallback((key: number) => setTarget({ key }), []);
  const onChangeEvent = useCallback((eventName: string) => setTarget({ key: pluginKey, eventName }), [pluginKey]);
  const onAddAction = useCallback(() => {
    eventStore.addEventInstance(trigger!, {
      type: EventTargetType.PLUGIN,
      eventName: eventName!,
      key: pluginKey!,
      maxTimeout,
    });
    setTarget(null);
    setTrigger(null);
  }, [eventName, pluginKey]);

  const disabled = !(trigger && pluginKey && eventName);

  return (
    <>
      <div className="event-form-prop-item">
        <span>
          <Trans>Target Plugin</Trans>:
        </span>
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
          <span>
            <Trans>Target Action</Trans>:
          </span>
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
        <span>
          <Trans>Add</Trans>
        </span>
      </Button>
    </>
  );
}

function filterPluginInstance(pluginInstances: PluginInstance[]) {
  return pluginInstances
    .map<[number, MaterialsPluginMeta]>(({ plugin, key }) => [key, getMaterialsPluginMeta(plugin)!])
    .filter(([, { onEvents }]) => !!onEvents?.length);
}

export const PluginTargetSelector = observer(IPluginTargetSelector);
