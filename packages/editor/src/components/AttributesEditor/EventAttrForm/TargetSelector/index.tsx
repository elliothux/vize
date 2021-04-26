import './index.scss';
import * as React from 'react';
import { Select } from 'antd';
import { EventTargetType, MaterialsCustomEvent, Maybe } from 'types';
import { Trans } from 'react-i18next';

interface Props {
  targetType: Maybe<EventTargetType>;
  setTargetType: (target: EventTargetType) => void;
  customEvents?: MaterialsCustomEvent[];
}

const { Option: SelectOption } = Select;

export function TargetSelector({ targetType, setTargetType }: Props) {
  return (
    <div className="event-form-prop-item">
      <span>
        <Trans>Execute Type</Trans>:
      </span>
      <Select
        className="event-form-selector"
        dropdownClassName="event-form-selector-options"
        value={targetType || undefined}
        onChange={setTargetType}
      >
        <SelectOption value={EventTargetType.Action}>
          <Trans>Action</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.Component}>
          <Trans>Component</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.Plugin}>
          <Trans>Plugin</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.Global}>
          <Trans>Global</Trans>
        </SelectOption>
        <SelectOption value={EventTargetType.Page}>
          <Trans>Page</Trans>
        </SelectOption>
      </Select>
    </div>
  );
}

export * from './TargetForm';
