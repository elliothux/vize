import * as React from 'react';
import { ComponentUniversalEventTriggers, PluginUniversalEventTrigger } from 'types';
import { MdBlurCircular, MdCallMade, MdCallReceived, MdPanTool } from 'react-icons/md';
import { FiEye, FiEyeOff, FiMousePointer } from 'react-icons/fi';

export const triggerTextMap = new Map<ComponentUniversalEventTriggers | PluginUniversalEventTrigger, React.ReactNode>([
  [
    ComponentUniversalEventTriggers.INIT,
    <>
      <MdBlurCircular />
      初始化
    </>,
  ],
  [
    ComponentUniversalEventTriggers.CLICK,
    <>
      <FiMousePointer />
      点击
    </>,
  ],
  [
    ComponentUniversalEventTriggers.MOUSE_ENTER,
    <>
      <MdCallReceived />
      鼠标移入
    </>,
  ],
  [
    ComponentUniversalEventTriggers.MOUSE_LEAVE,
    <>
      <MdCallMade />
      鼠标移出
    </>,
  ],
  [
    ComponentUniversalEventTriggers.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      双击
    </>,
  ],
  [
    ComponentUniversalEventTriggers.LONG_PRESS,
    <>
      <MdPanTool />
      长按
    </>,
  ],
  [
    ComponentUniversalEventTriggers.ENTER_VIEW,
    <>
      <FiEye />
      出现
    </>,
  ],
  [
    ComponentUniversalEventTriggers.LEAVE_VIEW,
    <>
      <FiEyeOff />
      消失
    </>,
  ],
  [
    PluginUniversalEventTrigger.BEFORE_EXEC,
    <>
      <MdBlurCircular />
      执行前
    </>,
  ],
  [
    PluginUniversalEventTrigger.AFTER_EXEC,
    <>
      <MdBlurCircular />
      执行后
    </>,
  ],
]);
