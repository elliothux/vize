import * as React from 'react';
import { EventInstanceTrigger } from './EventInstanceTrigger';
import { EventInstanceTarget } from './EventInstanceTarget';
import { Button, Popconfirm } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { EventInstance, MaterialsCustomEvent } from 'types';
import { SortableHandle } from 'react-sortable-hoc';

interface Props {
  eventInstance: EventInstance;
  customEvents?: MaterialsCustomEvent[];
  onDelete: () => void;
}

function IEventHeader({ eventInstance: { target, trigger }, customEvents, onDelete }: Props) {
  return (
    <>
      <EventInstanceTrigger trigger={trigger} target={target} customEvents={customEvents} />
      <EventInstanceTarget target={target} />
      <Popconfirm title="确认删除吗?" onConfirm={onDelete} okText="删除" cancelText="取消">
        <Button danger shape="round" icon={<FiTrash2 />} />
      </Popconfirm>
    </>
  );
}

export const EventHeader = SortableHandle(IEventHeader);
