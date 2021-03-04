import * as React from 'react';
import { useMemo } from 'react';
import { EventTargetType, EventTrigger, EventTarget, MaterialsCustomEvent } from 'types';
import { Trans } from 'react-i18next';
import { i18n } from 'i18n';
import { getTriggerDisplayName } from './utils';

interface Props {
  trigger: EventTrigger;
  target: EventTarget;
  customEvents?: MaterialsCustomEvent[];
}

export function EventInstanceTrigger({ trigger, target, customEvents }: Props) {
  const [triggerDisplayName, TriggerIcon] = useMemo(() => getTriggerDisplayName(trigger, customEvents), []);

  return (
    <p className="event_instance_trigger">
      <TriggerIcon />
      <Trans>when</Trans> <span>{triggerDisplayName}</span> <Trans>do</Trans> {getTargetTypeDesc(target.type)}
    </p>
  );
}

function getTargetTypeDesc(type: EventTargetType) {
  const descMap = {
    [EventTargetType.ACTION]: i18n.t('execute action'),
    [EventTargetType.PLUGIN]: i18n.t('trigger plugin event'),
    [EventTargetType.COMPONENT]: i18n.t('trigger component event'),
  };
  return descMap[type];
}
