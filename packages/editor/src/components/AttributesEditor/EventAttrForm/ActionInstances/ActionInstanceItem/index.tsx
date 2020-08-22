import * as React from 'react';
import { useMemo } from 'react';
import { ActionInstance, EventTargetType, MaterialsCustomEvent } from 'types';
import { Card } from 'antd';
import { getTriggerDisplayName } from './utils';
import { ActionInstanceDataForm } from './ActionInstanceDataForm';
import { ActionInstanceTarget } from './ActionInstanceTarget';

interface Props {
  actionInstance: ActionInstance;
  onChangeData?: (data: object) => void;
  customEvents?: MaterialsCustomEvent[];
}

export function ActionInstanceItem({
  customEvents,
  actionInstance,
  actionInstance: { key, target, trigger },
  onChangeData,
}: Props) {
  const [triggerDisplayName, TriggerIcon] = useMemo(() => getTriggerDisplayName(trigger, customEvents), []);

  return (
    <Card
      className="vize_action_instance"
      key={key}
      title={
        <>
          <p className="vize_action_instance_trigger">
            <TriggerIcon />
            {triggerDisplayName} 触发
          </p>
          <ActionInstanceTarget target={target} />
        </>
      }
    >
      {target.type === EventTargetType.ACTION ? (
        <ActionInstanceDataForm instance={actionInstance} onChange={onChangeData!} />
      ) : null}
    </Card>
  );
}
