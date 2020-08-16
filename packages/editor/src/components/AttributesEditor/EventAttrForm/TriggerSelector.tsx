import * as React from 'react';
import * as R from 'ramda';
import { Select } from 'antd';
import { FiLayers } from 'react-icons/fi';
import {
  BasePluginEventTriggerType,
  BaseComponentEventTriggerType,
  EventTriggerType,
  MaterialsCustomEvent,
  Maybe,
} from 'types';
import { triggerTextMap } from './utils';
import { useMemo } from 'react';

const { Option: SelectOption, OptGroup } = Select;

interface Props {
  type: 'component' | 'plugin';
  trigger: Maybe<EventTriggerType>;
  setTrigger: (trigger: EventTriggerType) => void;
  customEvents?: MaterialsCustomEvent[];
}

export function EventTriggerSelector({ type, trigger, setTrigger, customEvents }: Props) {
  const onChange = useMemo(() => R.unary(setTrigger), []);
  const isComponent = type === 'component';

  return (
    <div className="event-form-prop-item">
      <span>触发条件:</span>
      <Select
        value={trigger || undefined}
        onChange={onChange}
        className="event-form-selector"
        dropdownClassName="event-form-selector-options"
      >
        {customEvents ? (
          <OptGroup label={`${isComponent ? '组件' : '插件'}自定义触发`}>
            {customEvents.map(({ eventName, displayName }) => (
              <SelectOption value={eventName} key={eventName}>
                <FiLayers />
                {displayName}
              </SelectOption>
            ))}
          </OptGroup>
        ) : null}

        <OptGroup label="通用触发">
          {Object.entries(isComponent ? BaseComponentEventTriggerType : BasePluginEventTriggerType).map(
            ([, trigger]) => (
              <SelectOption value={trigger} key={trigger}>
                {triggerTextMap.get(trigger)}
              </SelectOption>
            ),
          )}
        </OptGroup>
      </Select>
    </div>
  );
}
