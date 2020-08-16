import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { SelectType } from '../../../states';
import { EventTriggerSelector } from './TriggerSelector';
import { useState } from 'react';
import { EventTrigger, Maybe } from '../../../types';
import { useCurrentComponentMeta } from '../../../hooks';

interface Props {
  selectType: number;
}

function IEventAttrForm({ selectType }: Props) {
  const [trigger, setTrigger] = useState<Maybe<EventTrigger>>(null);

  const meta = useCurrentComponentMeta();

  if (selectType !== SelectType.COMPONENT) {
    return null;
  }

  return (
    <div className="event-form">
      <EventTriggerSelector trigger={trigger} setTrigger={setTrigger} customEvents={meta!.emitEvents} />
    </div>
  );
}

export const EventAttrForm = observer(IEventAttrForm);
