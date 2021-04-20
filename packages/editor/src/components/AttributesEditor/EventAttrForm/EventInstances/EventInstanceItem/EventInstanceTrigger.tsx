import * as React from 'react';
import { useMemo } from 'react';
import { EventTargetType, EventTrigger, EventTarget, MaterialsCustomEvent } from 'types';
import { Trans } from 'react-i18next';
import { i18n } from 'i18n';
import { getTriggerDisplayName } from '../../utils';

interface Props {
  trigger: EventTrigger;
  target: EventTarget;
  customEvents?: MaterialsCustomEvent[];
}

export function EventInstanceTrigger({ trigger, target, customEvents }: Props) {
  const [triggerDisplayName, TriggerIcon] = useMemo(() => getTriggerDisplayName(trigger, customEvents), []);
  const actionDesc = i18n.t(getTargetTypeDesc(target.type));

  return (
    <p className="event_instance_trigger">
      <TriggerIcon />
      <Trans i18nKey="TriggerWhen">
        when <span>{{ trigger: triggerDisplayName, action: actionDesc }}</span>
      </Trans>
    </p>
  );
}

function getTargetTypeDesc(type: EventTargetType) {
  const descMap = {
    [EventTargetType.Action]: 'Execute action',
    [EventTargetType.Plugin]: 'Trigger plugin',
    [EventTargetType.Component]: 'Trigger component',
    [EventTargetType.Global]: 'Trigger global',
    [EventTargetType.Page]: 'Trigger page',
  };
  return descMap[type];
}
