import './index.scss';
import * as React from 'react';
import { useCallback } from 'react';
import { Radio, Select } from 'antd';
import { EventTargetType, MaterialsCustomEvent, Maybe } from 'types';
import { Trans } from 'react-i18next';

interface Props {
  target: Maybe<EventTargetType>;
  setTarget: (target: EventTargetType) => void;
  customEvents?: MaterialsCustomEvent[];
}

const { Option: SelectOption } = Select;

export function TargetSelector({ target, setTarget }: Props) {
  return (
    <div className="event-form-prop-item">
      <span>
        <Trans>Execute Type</Trans>:
      </span>
      <Select
        className="event-form-selector"
        dropdownClassName="event-form-selector-options"
        value={target || undefined}
        onChange={setTarget}
      >
        <SelectOption value={EventTargetType.ACTION}>
          <Trans>Action</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.COMPONENT}>
          <Trans>Component</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.PLUGIN}>
          <Trans>Plugin</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.CONTAINER}>
          <Trans>Container</Trans>
        </SelectOption>
      </Select>
    </div>
  );
}

export * from './ActionTargetSelector';
export * from './ComponentTargetSelector';
export * from './PluginTargetSelector';
