import * as React from 'react';
import { useMemo } from 'react';
import { EventInstance, EventTargetType, MaterialsCustomEvent } from 'types';
import { Card } from 'antd';
import { getTriggerDisplayName } from './utils';
import { EventInstanceDataForm } from './EventInstanceDataForm';
import { EventInstanceTarget } from './EventInstanceTarget';

interface Props {
  actionInstance: EventInstance;
  onChangeData?: (data: object) => void;
  customEvents?: MaterialsCustomEvent[];
}

export function EventInstanceItem({
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
          <EventInstanceTarget target={target} />
        </>
      }
    >
      {target.type === EventTargetType.ACTION ? (
        <EventInstanceDataForm instance={actionInstance} onChange={onChangeData!} />
      ) : null}
    </Card>
  );
}
