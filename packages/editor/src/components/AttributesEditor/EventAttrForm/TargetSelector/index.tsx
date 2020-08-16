import * as React from 'react';
import { useCallback } from 'react';
import { Radio } from 'antd';
import { EventTargetType, MaterialsCustomEvent, Maybe } from 'types';

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
      <span>触发类型:</span>
      <RadioGroup value={target} onChange={onChange}>
        <Radio value={EventTargetType.ACTION}>动作</Radio>
        <Radio value={EventTargetType.COMPONENT}>组件</Radio>
        <Radio value={EventTargetType.PLUGIN}>插件</Radio>
      </RadioGroup>
    </div>
  );
}

export * from './ActionTargetSelector';
export * from './ComponentTargetSelector';
export * from './PluginTargetSelector';
