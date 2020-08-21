import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { PageMeta } from './pages';
import { Maybe } from './helper';

export interface MaterialsActionMeta {
  identityName: string;
  lib: string;
  name: string;
  readonly thumb: string;
  readonly info: MaterialsInfo;
  readonly dataForm?: MaterialsForm;
  readonly emitEvents?: MaterialsCustomEvent[];
  readonly isBuildIn?: boolean;
}

export enum ActionTargetType {
  COMPONENT = 'component',
  PLUGIN = 'plugin',
}

export interface ActionTarget {
  type: ActionTargetType;
  key: number;
}

export interface ActionInstance {
  key: Readonly<number>;
  data: { [key: string]: any };
  action: Readonly<string>; // action id or component/plugin eventName
  trigger: EventTriggerType;
  target: Maybe<ActionTarget>;
  actions: ActionInstance[];
}

export const EVENT_TRIGGER_PREFIX = '__vize_event_trigger_';

export enum BaseComponentEventTriggerType {
  CLICK = '__vize_component_event_trigger_click',
  DOUBLE_CLICK = '__vize_component_event_trigger_double_click',
  LONG_PRESS = '__vize_component_event_trigger_long_press',
  ENTER_VIEW = '__vize_component_event_trigger_enter_view',
  LEAVE_VIEW = '__vize_component_event_trigger_leave_view',
  INIT = '__vize_component_event_trigger_init',
  MOUSE_ENTER = '__vize_component_event_trigger_mouseEnter',
  MOUSE_LEAVE = '__vize_component_event_trigger_mouseLeave',
}

export enum BasePluginEventTriggerType {
  BEFORE_EXEC = '__vize_plugin_event_trigger_before_exec',
  AFTER_EXEC = '__vize_plugin_event_trigger_after_exec',
}

export type EventTriggerType = BaseComponentEventTriggerType | BasePluginEventTriggerType | 'string';

export enum EventTargetType {
  ACTION = 'action',
  COMPONENT = 'component',
  PLUGIN = 'plugin',
}

// TODO
export interface ActionParams {
  data: object;
  global: object;
  meta: PageMeta;
}

export type MaterialsAction = (params: ActionParams) => void;
