import { SelectType } from 'states';
import { EventTriggerName, MaterialsCustomEvent, Maybe, UniversalEventTrigger } from 'types';

export interface TriggerSelectorProps extends Props {
  customEvents?: MaterialsCustomEvent[];
  universalEventTriggers: UniversalEventTrigger[];
}

export interface Props {
  type: SelectType;
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: EventTriggerName) => void;
}
