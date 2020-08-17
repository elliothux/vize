import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { SelectType } from 'states';
import { EventTargetType, EventTriggerType, Maybe } from 'types';
import { useCurrentComponentMeta, useCurrentPluginMeta } from 'hooks';
import { EventTriggerSelector } from './TriggerSelector';
import { TargetSelector, ActionTargetSelector, ComponentTargetSelector, PluginTargetSelector } from './TargetSelector';

interface Props {
  selectType: number;
}

function IEventAttrForm({ selectType }: Props) {
  const [trigger, setTrigger] = useState<Maybe<EventTriggerType>>(null);
  const [target, setTarget] = useState<EventTargetType>(EventTargetType.COMPONENT);

  const [actionId, setAction] = useState<Maybe<string>>(null);
  const [component, setComponent] = useState<Maybe<[number, Maybe<string>]>>(null);
  const [plugin, setPlugin] = useState<Maybe<[number, Maybe<string>]>>(null);

  const componentMeta = useCurrentComponentMeta();
  const pluginMeta = useCurrentPluginMeta();

  if (!(selectType === SelectType.COMPONENT || selectType === SelectType.PLUGIN)) {
    return null;
  }

  let targetForm;
  switch (target) {
    case EventTargetType.ACTION:
      targetForm = <ActionTargetSelector actionId={actionId} setAction={setAction} trigger={trigger} />;
      break;
    case EventTargetType.COMPONENT:
      targetForm = <ComponentTargetSelector component={component} setComponent={setComponent} trigger={trigger} />;
      break;
    case EventTargetType.PLUGIN:
      targetForm = <PluginTargetSelector plugin={plugin} setPlugin={setPlugin} trigger={trigger} />;
      break;
  }

  const isComponent = selectType === SelectType.COMPONENT;

  return (
    <div className="event-form">
      <EventTriggerSelector
        type={isComponent ? 'component' : 'plugin'}
        trigger={trigger}
        setTrigger={setTrigger}
        customEvents={isComponent ? componentMeta!.emitEvents : pluginMeta!.emitEvents}
      />
      <TargetSelector target={target} setTarget={setTarget} />
      {targetForm}
    </div>
  );
}

export const EventAttrForm = observer(IEventAttrForm);
