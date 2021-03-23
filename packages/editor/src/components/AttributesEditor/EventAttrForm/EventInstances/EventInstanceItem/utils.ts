import { ComponentType } from 'react';
import {
  ComponentUniversalEventTrigger,
  ContainerUniversalEventTrigger,
  EventTrigger,
  EventTriggerType,
  HotAreaUniversalEventTrigger,
  MaterialsCustomEvent,
  PluginUniversalEventTrigger,
} from 'types';
import { FiMousePointer, FiLayers, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdCallReceived, MdCallMade, MdBlurCircular, MdPanTool } from 'react-icons/md';
import { i18n } from 'i18n';

const ComponentUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [ComponentUniversalEventTrigger.CLICK]: [i18n.t('click'), FiMousePointer],
  [ComponentUniversalEventTrigger.DOUBLE_CLICK]: [i18n.t('double click'), FiMousePointer],
  [ComponentUniversalEventTrigger.LONG_PRESS]: [i18n.t('long press'), MdPanTool],
  [ComponentUniversalEventTrigger.ENTER_VIEW]: [i18n.t('appear'), FiEye],
  [ComponentUniversalEventTrigger.LEAVE_VIEW]: [i18n.t('disappear'), FiEyeOff],
  [ComponentUniversalEventTrigger.INIT]: [i18n.t('initialization'), MdBlurCircular],
  [ComponentUniversalEventTrigger.MOUSE_ENTER]: [i18n.t('mouse in'), MdCallReceived],
  [ComponentUniversalEventTrigger.MOUSE_LEAVE]: [i18n.t('mouse leave'), MdCallMade],
};

const PluginUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [PluginUniversalEventTrigger.BEFORE_EXEC]: [i18n.t('before execute'), FiMousePointer],
  [PluginUniversalEventTrigger.AFTER_EXEC]: [i18n.t('after execute'), FiMousePointer],
};

const ContainerUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [ContainerUniversalEventTrigger.BEFORE_RENDER]: [i18n.t('before render'), FiMousePointer],
  [ContainerUniversalEventTrigger.AFTER_RENDER]: [i18n.t('after render'), FiMousePointer],
};

const HotAreaUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [HotAreaUniversalEventTrigger.CLICK]: [i18n.t('click'), FiMousePointer],
  [HotAreaUniversalEventTrigger.DOUBLE_CLICK]: [i18n.t('double click'), FiMousePointer],
  [HotAreaUniversalEventTrigger.LONG_PRESS]: [i18n.t('long press'), MdPanTool],
  [HotAreaUniversalEventTrigger.ENTER_VIEW]: [i18n.t('appear'), FiEye],
  [HotAreaUniversalEventTrigger.LEAVE_VIEW]: [i18n.t('disappear'), FiEyeOff],
  [HotAreaUniversalEventTrigger.MOUSE_ENTER]: [i18n.t('mouse in'), MdCallReceived],
  [HotAreaUniversalEventTrigger.MOUSE_LEAVE]: [i18n.t('mouse leave'), MdCallMade],
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
    case EventTriggerType.ContainerUniversalTrigger: {
      return ContainerUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.Custom: {
      const { displayName } = customEvents!.find(i => i.eventName === triggerName)!;
      return [displayName, FiLayers];
    }
  }
}
