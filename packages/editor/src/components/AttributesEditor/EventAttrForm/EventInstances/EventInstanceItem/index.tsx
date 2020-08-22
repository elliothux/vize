import * as React from 'react';
import { EventInstance, EventTargetType, MaterialsCustomEvent } from 'types';
import { Card, Button, Popconfirm } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { EventInstanceDataForm } from './EventInstanceDataForm';
import { EventInstanceTarget } from './EventInstanceTarget';
import { EventInstanceTrigger } from './EventInstanceTrigger';
import classNames from 'classnames';
import { useCallback } from 'react';
import { eventStore } from '../../../../../states';

interface Props {
  index: number;
  actionInstance: EventInstance;
  onChangeData?: (data: object) => void;
  customEvents?: MaterialsCustomEvent[];
}

export function EventInstanceItem({
  index,
  customEvents,
  actionInstance,
  actionInstance: { key, target, trigger },
  onChangeData,
}: Props) {
  const onDelete = useCallback(() => eventStore.deleteEventInstance(index), [index]);

  return (
    <Card
      className={classNames('vize_event_instance', { empty_form: target.type !== EventTargetType.ACTION })}
      key={key}
      title={
        <>
          <EventInstanceTrigger trigger={trigger} target={target} customEvents={customEvents} />
          <EventInstanceTarget target={target} />
          <Popconfirm title="确认删除吗?" onConfirm={onDelete} okText="删除" cancelText="取消">
            <Button danger shape="round" icon={<FiTrash2 />} />
          </Popconfirm>
        </>
      }
    >
      {target.type === EventTargetType.ACTION ? (
        <EventInstanceDataForm instance={actionInstance} onChange={onChangeData!} />
      ) : null}
    </Card>
  );
}
