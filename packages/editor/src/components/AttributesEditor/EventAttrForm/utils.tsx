import * as React from 'react';
import { ComponentUniversalEventTrigger, HotAreaUniversalEventTrigger, PluginUniversalEventTrigger } from 'types';
import { MdBlurCircular, MdCallMade, MdCallReceived, MdPanTool } from 'react-icons/md';
import { FiEye, FiEyeOff, FiMousePointer } from 'react-icons/fi';

export const triggerTextMap = new Map<
  ComponentUniversalEventTrigger | PluginUniversalEventTrigger | HotAreaUniversalEventTrigger,
  React.ReactNode
>([
  [
    ComponentUniversalEventTrigger.INIT,
    <>
      <MdBlurCircular />
      初始化
    </>,
  ],
  [
    ComponentUniversalEventTrigger.CLICK,
    <>
      <FiMousePointer />
      点击
    </>,
  ],
  [
    ComponentUniversalEventTrigger.MOUSE_ENTER,
    <>
      <MdCallReceived />
      鼠标移入
    </>,
  ],
  [
    ComponentUniversalEventTrigger.MOUSE_LEAVE,
    <>
      <MdCallMade />
      鼠标移出
    </>,
  ],
  [
    ComponentUniversalEventTrigger.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      双击
    </>,
  ],
  [
    ComponentUniversalEventTrigger.LONG_PRESS,
    <>
      <MdPanTool />
      长按
    </>,
  ],
  [
    ComponentUniversalEventTrigger.ENTER_VIEW,
    <>
      <FiEye />
      出现
    </>,
  ],
  [
    ComponentUniversalEventTrigger.LEAVE_VIEW,
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
  [
    HotAreaUniversalEventTrigger.CLICK,
    <>
      <FiMousePointer />
      点击
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.MOUSE_ENTER,
    <>
      <MdCallReceived />
      鼠标移入
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.MOUSE_LEAVE,
    <>
      <MdCallMade />
      鼠标移出
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      双击
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.LONG_PRESS,
    <>
      <MdPanTool />
      长按
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.ENTER_VIEW,
    <>
      <FiEye />
      出现
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.LEAVE_VIEW,
    <>
      <FiEyeOff />
      消失
    </>,
  ],
]);
