import * as React from 'react';
import { EventInstance, EventTargetType, MaterialsCustomEvent } from 'types';
import { Card } from 'antd';
import { EventInstanceDataForm } from './EventInstanceDataForm';
import { EventHeader } from './EventHeader';
import { SortableElement } from 'react-sortable-hoc';
import { useCallback } from 'react';
import { eventStore } from 'states';
import classNames from 'classnames';

interface Props {
  index: number;
  eventInstance: EventInstance;
  onChangeData?: (data: object) => void;
  customEvents?: MaterialsCustomEvent[];
}

function IEventInstanceItem({
  index,
  customEvents,
  eventInstance,
  eventInstance: { key, target },
  onChangeData,
}: Props) {
  const onDelete = useCallback(() => eventStore.deleteEventInstance(index), [index]);

  return (
    <Card
      key={key}
      className={classNames('vize-event-instance', { empty_form: target.type !== EventTargetType.Action })}
      title={<EventHeader eventInstance={eventInstance} onDelete={onDelete} customEvents={customEvents} />}
    >
      {target.type === EventTargetType.Action ? (
        <EventInstanceDataForm instance={eventInstance} onChange={onChangeData!} />
      ) : null}
    </Card>
  );
}

export const EventInstanceItem = SortableElement(IEventInstanceItem);
