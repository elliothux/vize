import './index.scss';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { SelectType } from 'states';
import { EventTargetType, EventTriggerName, Maybe } from 'types';
import { useCurrentComponentMeta, useCurrentPluginMeta } from 'hooks';
import { EventTriggerSelector } from './TriggerSelector';
import { TargetSelector, ActionTargetSelector, ComponentTargetSelector, PluginTargetSelector } from './TargetSelector';
import { EventInstances } from './EventInstances';
import { NotAvailable } from '../NotAvailable';

interface Props {
  selectType: SelectType;
}

function IEventAttrForm({ selectType }: Props) {
  const componentMeta = useCurrentComponentMeta();
  const pluginMeta = useCurrentPluginMeta();

  const [trigger, setTrigger] = useState<Maybe<EventTriggerName>>(null);
  const [targetType, setTargetType] = useState<EventTargetType>(EventTargetType.ACTION);

  useEffect(() => {
    setTrigger(null);
  }, [componentMeta?.identityName]);

  const targetForm = useMemo(() => {
    switch (targetType) {
      case EventTargetType.ACTION:
        return <ActionTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      case EventTargetType.COMPONENT:
        return <ComponentTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      case EventTargetType.PLUGIN:
        return <PluginTargetSelector trigger={trigger} setTrigger={setTrigger} />;
      default:
        return null;
    }
  }, [targetType]);

  const isComponent = selectType === SelectType.COMPONENT;
  const isPlugin = selectType === SelectType.PLUGIN;
  const isHotArea = selectType === SelectType.HOTAREA;

  if (!(isComponent || isPlugin || isHotArea) || (!componentMeta && !pluginMeta)) {
    return <NotAvailable />;
  }

  const customEvents = isHotArea ? undefined : isComponent ? componentMeta!.emitEvents : pluginMeta!.emitEvents;

  return (
    <div className="event-form">
      <EventTriggerSelector type={selectType} trigger={trigger} setTrigger={setTrigger} customEvents={customEvents} />

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
