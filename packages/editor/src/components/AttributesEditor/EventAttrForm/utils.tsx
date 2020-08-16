import * as React from 'react';
import { BaseEventTrigger } from '../../../types';
import { MdBlurCircular, MdCallMade, MdCallReceived, MdPanTool } from 'react-icons/md';
import { FiEye, FiEyeOff, FiMousePointer } from 'react-icons/fi';

export const triggerTextMap = new Map<BaseEventTrigger, React.ReactNode>([
  [
    BaseEventTrigger.INIT,
    <>
      <MdBlurCircular />
      初始化
    </>,
  ],
  [
    BaseEventTrigger.CLICK,
    <>
      <FiMousePointer />
      点击
    </>,
  ],
  [
    BaseEventTrigger.MOUSE_ENTER,
    <>
      <MdCallReceived />
      鼠标移入
    </>,
  ],
  [
    BaseEventTrigger.MOUSE_LEAVE,
    <>
      <MdCallMade />
      鼠标移出
    </>,
  ],
  [
    BaseEventTrigger.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      双击
    </>,
  ],
  [
    BaseEventTrigger.LONG_PRESS,
    <>
      <MdPanTool />
      长按
    </>,
  ],
  [
    BaseEventTrigger.ENTER_VIEW,
    <>
      <FiEye />
      出现
    </>,
  ],
  [
    BaseEventTrigger.LEAVE_VIEW,
    <>
      <FiEyeOff />
      消失
    </>,
  ],
]);
