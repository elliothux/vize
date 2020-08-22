import { ComponentType } from 'react';
import {
  ComponentUniversalEventTriggers,
  EventTrigger,
  EventTriggerType,
  MaterialsCustomEvent,
  PluginUniversalEventTrigger,
} from 'types';
import { FiMousePointer, FiLayers, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdCallReceived, MdCallMade, MdBlurCircular, MdPanTool } from 'react-icons/md';

const ComponentUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [ComponentUniversalEventTriggers.CLICK]: ['点击', FiMousePointer],
  [ComponentUniversalEventTriggers.DOUBLE_CLICK]: ['双击', FiMousePointer],
  [ComponentUniversalEventTriggers.LONG_PRESS]: ['长按', MdPanTool],
  [ComponentUniversalEventTriggers.ENTER_VIEW]: ['出现', FiEye],
  [ComponentUniversalEventTriggers.LEAVE_VIEW]: ['消失', FiEyeOff],
  [ComponentUniversalEventTriggers.INIT]: ['初始化', MdBlurCircular],
  [ComponentUniversalEventTriggers.MOUSE_ENTER]: ['鼠标移入', MdCallReceived],
  [ComponentUniversalEventTriggers.MOUSE_LEAVE]: ['鼠标移出', MdCallMade],
};

const PluginUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [PluginUniversalEventTrigger.BEFORE_EXEC]: ['执行前', FiMousePointer],
  [PluginUniversalEventTrigger.AFTER_EXEC]: ['执行后', FiMousePointer],
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
    case EventTriggerType.Custom: {
      const { displayName } = customEvents!.find(i => i.eventName === triggerName)!;
      return [displayName, FiLayers];
    }
  }
}
