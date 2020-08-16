import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { PageMeta } from './pages';

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

export interface ActionInstance {
  key: Readonly<number>;
  action: Readonly<string>;
  data: { [key: string]: any };
  trigger: EventTriggerType;
  actions: ActionInstance | ComponentActionsInstance;
}

export interface ComponentActionsInstance extends Exclude<ActionInstance, 'actions'> {
  target: number;
}

export type PluginActionsInstance = ComponentActionsInstance;

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
