import { ComponentType } from 'react';
import {
  ComponentUniversalEventTrigger,
  EventTrigger,
  EventTriggerType,
  GlobalUniversalEventTrigger,
  HotAreaUniversalEventTrigger,
  MaterialsCustomEvent,
  PageUniversalEventTrigger,
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
  [ComponentUniversalEventTrigger.MOUSE_LEAVE]: [i18n.t('mouse out'), MdCallMade],
};

const PluginUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [PluginUniversalEventTrigger.BEFORE_EXEC]: [i18n.t('before execute'), FiMousePointer],
  [PluginUniversalEventTrigger.AFTER_EXEC]: [i18n.t('after execute'), FiMousePointer],
};

const GlobalUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [GlobalUniversalEventTrigger.INIT]: [i18n.t('initialization'), MdBlurCircular],
};

const PageUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [PageUniversalEventTrigger.AFTER_ENTER_PAGE]: [i18n.t('after enter page'), MdBlurCircular],
  [PageUniversalEventTrigger.BEFORE_LEAVE_PAGE]: [i18n.t('before leave page'), MdBlurCircular],
};

const HotAreaUniversalEventTriggerDisplayMap: { [key: string]: [string, ComponentType] } = {
  [HotAreaUniversalEventTrigger.CLICK]: [i18n.t('click'), FiMousePointer],
  [HotAreaUniversalEventTrigger.DOUBLE_CLICK]: [i18n.t('double click'), FiMousePointer],
  [HotAreaUniversalEventTrigger.LONG_PRESS]: [i18n.t('long press'), MdPanTool],
  [HotAreaUniversalEventTrigger.ENTER_VIEW]: [i18n.t('appear'), FiEye],
  [HotAreaUniversalEventTrigger.LEAVE_VIEW]: [i18n.t('disappear'), FiEyeOff],
  [HotAreaUniversalEventTrigger.MOUSE_ENTER]: [i18n.t('mouse in'), MdCallReceived],
  [HotAreaUniversalEventTrigger.MOUSE_LEAVE]: [i18n.t('mouse out'), MdCallMade],
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
    case EventTriggerType.GlobalUniversalTrigger: {
      return GlobalUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.PageUniversalTrigger: {
      return PageUniversalEventTriggerDisplayMap[triggerName];
    }
    case EventTriggerType.Custom: {
      const { displayName } = customEvents!.find(i => i.eventName === triggerName)!;
      return [displayName, FiLayers];
    }
  }
}
