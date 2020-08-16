import * as React from 'react';
import { BaseComponentEventTriggerType, BasePluginEventTriggerType } from 'types';
import { MdBlurCircular, MdCallMade, MdCallReceived, MdPanTool } from 'react-icons/md';
import { FiEye, FiEyeOff, FiMousePointer } from 'react-icons/fi';

export const triggerTextMap = new Map<BaseComponentEventTriggerType | BasePluginEventTriggerType, React.ReactNode>([
  [
    BaseComponentEventTriggerType.INIT,
    <>
      <MdBlurCircular />
      初始化
    </>,
  ],
  [
    BaseComponentEventTriggerType.CLICK,
    <>
      <FiMousePointer />
      点击
    </>,
  ],
  [
    BaseComponentEventTriggerType.MOUSE_ENTER,
    <>
      <MdCallReceived />
      鼠标移入
    </>,
  ],
  [
    BaseComponentEventTriggerType.MOUSE_LEAVE,
    <>
      <MdCallMade />
      鼠标移出
    </>,
  ],
  [
    BaseComponentEventTriggerType.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      双击
    </>,
  ],
  [
    BaseComponentEventTriggerType.LONG_PRESS,
    <>
      <MdPanTool />
      长按
    </>,
  ],
  [
    BaseComponentEventTriggerType.ENTER_VIEW,
    <>
      <FiEye />
      出现
    </>,
  ],
  [
    BaseComponentEventTriggerType.LEAVE_VIEW,
    <>
      <FiEyeOff />
      消失
    </>,
  ],
  [
    BasePluginEventTriggerType.BEFORE_EXEC,
    <>
      <MdBlurCircular />
      执行前
    </>,
  ],
  [
    BasePluginEventTriggerType.AFTER_EXEC,
    <>
      <MdBlurCircular />
      执行后
    </>,
  ],
]);
