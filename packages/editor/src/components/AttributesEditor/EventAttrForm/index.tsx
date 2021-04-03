import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { SelectType } from 'states';
import { ComponentUniversalEventTrigger, EventTargetType, EventTriggerName, Maybe } from 'types';
import { Empty } from 'widgets/Empty';
import { i18n } from 'i18n';
import { TargetSelector, TargetForm } from './TargetSelector';
import { EventInstances } from './EventInstances';
import { TriggerSelector } from './TriggerSelector';

interface Props {
  selectType: SelectType;
}

function IEventAttrForm({ selectType }: Props) {
  const [trigger, setTrigger] = useState<Maybe<EventTriggerName>>(ComponentUniversalEventTrigger.CLICK);
  const [targetType, setTargetType] = useState<EventTargetType>(EventTargetType.ACTION);

  if (selectType === SelectType.HOTAREA) {
    return <Empty text={i18n.t('Not available')} />;
  }

  return (
    <div className="event-form">
      <TriggerSelector type={selectType} trigger={trigger} setTrigger={setTrigger} />
      {trigger ? (
        <>
          <TargetSelector targetType={targetType} setTargetType={setTargetType} />
          <TargetForm targetType={targetType} trigger={trigger} setTrigger={setTrigger} />
        </>
      ) : null}

      <EventInstances />
    </div>
  );
}

export const EventAttrForm = observer(IEventAttrForm);
