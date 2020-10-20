import { ComponentType } from 'react';
import {
  ComponentUniversalEventTrigger,
  EventTrigger,
  EventTriggerType,
  HotAreaUniversalEventTrigger,
  MaterialsCustomEvent,
  PluginUniversalEventTrigger,
} from 'types';
import { FiMousePointer, FiLayers, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdCallReceived, MdCallMade, MdBlurCircular, MdPanTool } from 'react-icons/md';

const ComponentUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [ComponentUniversalEventTrigger.CLICK]: ['点击', FiMousePointer],
  [ComponentUniversalEventTrigger.DOUBLE_CLICK]: ['双击', FiMousePointer],
  [ComponentUniversalEventTrigger.LONG_PRESS]: ['长按', MdPanTool],
  [ComponentUniversalEventTrigger.ENTER_VIEW]: ['出现', FiEye],
  [ComponentUniversalEventTrigger.LEAVE_VIEW]: ['消失', FiEyeOff],
  [ComponentUniversalEventTrigger.INIT]: ['初始化', MdBlurCircular],
  [ComponentUniversalEventTrigger.MOUSE_ENTER]: ['鼠标移入', MdCallReceived],
  [ComponentUniversalEventTrigger.MOUSE_LEAVE]: ['鼠标移出', MdCallMade],
};

const PluginUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [PluginUniversalEventTrigger.BEFORE_EXEC]: ['执行前', FiMousePointer],
  [PluginUniversalEventTrigger.AFTER_EXEC]: ['执行后', FiMousePointer],
};

const HotAreaUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [HotAreaUniversalEventTrigger.CLICK]: ['点击', FiMousePointer],
  [HotAreaUniversalEventTrigger.DOUBLE_CLICK]: ['双击', FiMousePointer],
  [HotAreaUniversalEventTrigger.LONG_PRESS]: ['长按', MdPanTool],
  [HotAreaUniversalEventTrigger.ENTER_VIEW]: ['出现', FiEye],
  [HotAreaUniversalEventTrigger.LEAVE_VIEW]: ['消失', FiEyeOff],
  [HotAreaUniversalEventTrigger.MOUSE_ENTER]: ['鼠标移入', MdCallReceived],
  [HotAreaUniversalEventTrigger.MOUSE_LEAVE]: ['鼠标移出', MdCallMade],
};

export function getTriggerDisplayName(
  { type, triggerName }: EventTrigger,
  customEvents?: MaterialsCustomEvent[],
): [string, ComponentType] {
  switch (type) {
    case EventTriggerType.ComponentUniversalTrigger: {
      return ComponentUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.PluginUniversalTrigger: {
      return PluginUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.HotAreaUniversalTrigger: {
      return HotAreaUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.Custom: {
      const { displayName } = customEvents!.find(i => i.eventName === triggerName)!;
      return [displayName, FiLayers];
    }
  }
}
