import * as React from 'react';
import * as R from 'ramda';
import { Select } from 'antd';
import { FiLayers } from 'react-icons/fi';
import { BaseEventTrigger, EventTrigger, MaterialsCustomEvent, Maybe } from 'types';
import { triggerTextMap } from './utils';

const { Option: SelectOption, OptGroup } = Select;

interface Props {
  trigger: Maybe<EventTrigger>;
  setTrigger: (trigger: EventTrigger) => void;
  customEvents?: MaterialsCustomEvent[];
}

export function EventTriggerSelector({ trigger, setTrigger, customEvents }: Props) {
  return (
    <div className="event-form-prop-item">
      <span>触发条件:</span>
      <Select
        value={trigger || undefined}
        onChange={R.unary(setTrigger)}
        className="event-form-trigger-selector"
        dropdownClassName="event-form-trigger-selector-options"
      >
        {customEvents ? (
          <OptGroup label="组件自定义触发">
            {customEvents.map(({ eventName, displayName }) => (
              <SelectOption value={eventName} key={eventName}>
                <FiLayers />
                {displayName}
              </SelectOption>
            ))}
          </OptGroup>
        ) : null}

        <OptGroup label="通用触发">
          {Object.entries(BaseEventTrigger).map(([, trigger]) => (
            <SelectOption value={trigger} key={trigger}>
              {triggerTextMap.get(trigger)}
            </SelectOption>
          ))}
        </OptGroup>
      </Select>
    </div>
  );
}
