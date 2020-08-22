import * as React from 'react';
import { EventInstance, EventTargetType, MaterialsCustomEvent } from 'types';
import { Card } from 'antd';
import { EventInstanceDataForm } from './EventInstanceDataForm';
import { EventInstanceTarget } from './EventInstanceTarget';
import { EventInstanceTrigger } from './EventInstanceTrigger';
import classNames from 'classnames';

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
  return (
    <Card
      className={classNames('vize_event_instance', { empty_form: target.type !== EventTargetType.ACTION })}
      key={key}
      title={
        <>
          <EventInstanceTrigger trigger={trigger} target={target} customEvents={customEvents} />
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
