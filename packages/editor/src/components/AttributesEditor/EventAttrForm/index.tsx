import './index.scss';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { SelectType } from 'states';
import { EventTargetType, EventTriggerName, Maybe } from 'types';
import { useCurrentComponentMeta, useCurrentPluginMeta } from 'hooks';
import { EventTriggerSelector } from './TriggerSelector';
import { TargetSelector, ActionTargetSelector, ComponentTargetSelector, PluginTargetSelector } from './TargetSelector';
import { EventInstances } from './EventInstances';

interface Props {
  selectType: number;
}

function IEventAttrForm({ selectType }: Props) {
  const componentMeta = useCurrentComponentMeta();
  const pluginMeta = useCurrentPluginMeta();

  const [trigger, setTrigger] = useState<Maybe<EventTriggerName>>(null);
  const [targetType, setTargetType] = useState<EventTargetType>(EventTargetType.ACTION);

  useEffect(() => {
    setTrigger(null);
  }, [componentMeta?.identityName]);

  if (!(selectType === SelectType.COMPONENT || selectType === SelectType.PLUGIN)) {
    return null;
  }

  let targetForm;
  switch (targetType) {
    case EventTargetType.ACTION:
      targetForm = <ActionTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      break;
    case EventTargetType.COMPONENT:
      targetForm = <ComponentTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      break;
    case EventTargetType.PLUGIN:
      targetForm = <PluginTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      break;
  }

  const isComponent = selectType === SelectType.COMPONENT;
  const customEvents = isComponent ? componentMeta!.emitEvents : pluginMeta!.emitEvents;

  return (
    <div className="event-form">
      <EventTriggerSelector
        type={isComponent ? 'component' : 'plugin'}
        trigger={trigger}
        setTrigger={setTrigger}
        customEvents={customEvents}
      />

      {trigger ? (
        <>
          <TargetSelector target={targetType} setTarget={setTargetType} />
          {targetForm}
        </>
      ) : null}

      <EventInstances />
    </div>
  );
}

export const EventAttrForm = observer(IEventAttrForm);
