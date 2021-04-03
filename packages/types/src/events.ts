export interface MaterialsCustomEvent {
  displayName: string;
  eventName: string;
  maxTimeout?: number | 'infinity';
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
  ContainerUniversalTrigger = 'container_universal_trigger',
  Custom = 'custom',
}

export type UniversalEventTrigger =
  | ComponentUniversalEventTrigger
  | PluginUniversalEventTrigger
  | HotAreaUniversalEventTrigger
  | ContainerUniversalEventTrigger;

export type EventTriggerName = UniversalEventTrigger | string;

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

export enum ContainerUniversalEventTrigger {
  BEFORE_RENDER = '__vize_container_event_trigger_before_render',
  AFTER_RENDER = '__vize_container_event_trigger_after_render',
}

/**
 * @desc event target
 */

export enum EventTargetType {
  ACTION = 'action',
  COMPONENT = 'component',
  PLUGIN = 'plugin',
  CONTAINER = 'container',
}

export interface ActionEventTarget {
  type: EventTargetType.ACTION;
  id: string;
  lib: string;
  maxTimeout: number | 'infinity';
}

export interface ComponentEventTarget {
  type: EventTargetType.COMPONENT;
  key: number;
  eventName: string;
  maxTimeout: number | 'infinity';
}

export interface PluginEventTarget extends Omit<ComponentEventTarget, 'type'> {
  type: EventTargetType.PLUGIN;
}

export interface ContainerEventTarget extends Omit<ComponentEventTarget, 'key' | 'type'> {
  type: EventTargetType.CONTAINER;
}

export type EventTarget = ActionEventTarget | ComponentEventTarget | PluginEventTarget | ContainerEventTarget;
