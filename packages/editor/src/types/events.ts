export interface MaterialsCustomEvent {
  displayName: string;
  eventName: string;
}

export interface EventInstance {
  key: Readonly<number>;
  data?: { [key: string]: any };
  trigger: EventTrigger;
  target: EventTarget;
  events: EventInstance[];
}

/**
 * @desc event trigger
 */

export interface EventTrigger {
  type: EventTriggerType;
  triggerName: EventTriggerName;
}

export enum EventTriggerType {
  ComponentUniversalTrigger = 'component_universal_trigger',
  PluginUniversalTrigger = 'plugin_universal_trigger',
  HotAreaUniversalTrigger = 'hotarea_universal_trigger',
  Custom = 'custom',
}

export type EventTriggerName =
  | ComponentUniversalEventTrigger
  | PluginUniversalEventTrigger
  | HotAreaUniversalEventTrigger
  | string;

export const EVENT_TRIGGER_PREFIX = '__vize_event_trigger_';

export enum ComponentUniversalEventTrigger {
  CLICK = '__vize_component_event_trigger_click',
  DOUBLE_CLICK = '__vize_component_event_trigger_double_click',
  LONG_PRESS = '__vize_component_event_trigger_long_press',
  ENTER_VIEW = '__vize_component_event_trigger_enter_view',
  LEAVE_VIEW = '__vize_component_event_trigger_leave_view',
  INIT = '__vize_component_event_trigger_init',
  MOUSE_ENTER = '__vize_component_event_trigger_mouseEnter',
  MOUSE_LEAVE = '__vize_component_event_trigger_mouseLeave',
}

export enum HotAreaUniversalEventTrigger {
  CLICK = '__vize_hotarea_event_trigger_click',
  DOUBLE_CLICK = '__vize_hotarea_event_trigger_double_click',
  LONG_PRESS = '__vize_hotarea_event_trigger_long_press',
  ENTER_VIEW = '__vize_hotarea_event_trigger_enter_view',
  LEAVE_VIEW = '__vize_hotarea_event_trigger_leave_view',
  MOUSE_ENTER = '__vize_hotarea_event_trigger_mouseEnter',
  MOUSE_LEAVE = '__vize_hotarea_event_trigger_mouseLeave',
}

export enum PluginUniversalEventTrigger {
  BEFORE_EXEC = '__vize_plugin_event_trigger_before_exec',
  AFTER_EXEC = '__vize_plugin_event_trigger_after_exec',
}

/**
 * @desc event target
 */

export enum EventTargetType {
  ACTION = 'action',
  COMPONENT = 'component',
  PLUGIN = 'plugin',
}

export interface ActionEventTarget {
  type: EventTargetType.ACTION;
  id: string;
  lib: string;
}

export interface ComponentEventTarget {
  type: EventTargetType.COMPONENT;
  key: number;
  eventName: string;
}

export interface PluginEventTarget extends Omit<ComponentEventTarget, 'type'> {
  type: EventTargetType.PLUGIN;
}

export type EventTarget = ActionEventTarget | ComponentEventTarget | PluginEventTarget;
