import * as React from 'react';
import { Button, Popconfirm } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { EventInstance, MaterialsCustomEvent } from '@vize/types';
import { SortableHandle } from 'react-sortable-hoc';
import { useTranslation } from 'react-i18next';
import { EventInstanceTrigger } from './EventInstanceTrigger';
import { EventInstanceTarget } from './EventInstanceTarget';

interface Props {
  eventInstance: EventInstance;
  customEvents?: MaterialsCustomEvent[];
  onDelete: () => void;
}

function IEventHeader({ eventInstance: { target, trigger }, customEvents, onDelete }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <EventInstanceTrigger trigger={trigger} target={target} customEvents={customEvents} />
      <EventInstanceTarget target={target} />
      <Popconfirm title={t('Confirm delete?')} onConfirm={onDelete} okText={t('Delete')} cancelText={t('Cancel')}>
        <Button danger shape="round" icon={<FiTrash2 />} />
      </Popconfirm>
    </>
  );
}

export const EventHeader = SortableHandle(IEventHeader);
