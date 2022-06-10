import { SelectType } from 'states';
import { EventTriggerName, EventTriggerType, MaterialsCustomEvent, Maybe, UniversalEventTrigger } from '@vize/types';

export interface TriggerSelectorProps extends Props {
  customEvents?: MaterialsCustomEvent[];
  universalEventTriggers: UniversalEventTrigger[];
  triggerType: EventTriggerType;
}

export interface Props {
  type: SelectType;
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: EventTriggerName) => void;
}
