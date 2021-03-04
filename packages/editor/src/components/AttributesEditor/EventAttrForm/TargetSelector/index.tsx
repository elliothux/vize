import './index.scss';
import * as React from 'react';
import { useCallback } from 'react';
import { Radio } from 'antd';
import { EventTargetType, MaterialsCustomEvent, Maybe } from 'types';
import { Trans } from 'react-i18next';

interface Props {
  target: Maybe<EventTargetType>;
  setTarget: (target: EventTargetType) => void;
  customEvents?: MaterialsCustomEvent[];
}

const { Group: RadioGroup } = Radio;

export function TargetSelector({ target, setTarget }: Props) {
  const onChange = useCallback(e => setTarget(e.target.value), []);

  return (
    <div className="event-form-prop-item">
      <span>
        <Trans>Execute Type</Trans>:
      </span>
      <RadioGroup value={target} onChange={onChange}>
        <Radio value={EventTargetType.ACTION}>
          <Trans>Action</Trans>
        </Radio>
        <Radio value={EventTargetType.COMPONENT}>
          <Trans>Component</Trans>
        </Radio>
        <Radio value={EventTargetType.PLUGIN}>
          <Trans>Plugin</Trans>
        </Radio>
      </RadioGroup>
    </div>
  );
}

export * from './ActionTargetSelector';
export * from './ComponentTargetSelector';
export * from './PluginTargetSelector';
