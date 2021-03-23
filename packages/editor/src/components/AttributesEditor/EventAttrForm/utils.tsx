import * as React from 'react';
import {
  ComponentUniversalEventTrigger,
  HotAreaUniversalEventTrigger,
  PluginUniversalEventTrigger,
  ContainerUniversalEventTrigger,
} from 'types';
import { MdBlurCircular, MdCallMade, MdCallReceived, MdPanTool } from 'react-icons/md';
import { FiEye, FiEyeOff, FiMousePointer } from 'react-icons/fi';
import { Trans } from 'react-i18next';

export const triggerTextMap = new Map<
  | ComponentUniversalEventTrigger
  | PluginUniversalEventTrigger
  | HotAreaUniversalEventTrigger
  | ContainerUniversalEventTrigger,
  React.ReactNode
>([
  [
    ComponentUniversalEventTrigger.INIT,
    <>
      <MdBlurCircular />
      <Trans>initialization</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.CLICK,
    <>
      <FiMousePointer />
      <Trans>click</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.MOUSE_ENTER,
    <>
      <MdCallReceived />
      <Trans>mouse in</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.MOUSE_LEAVE,
    <>
      <MdCallMade />
      <Trans>mouse out</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      <Trans>double click</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.LONG_PRESS,
    <>
      <MdPanTool />
      <Trans>long press</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.ENTER_VIEW,
    <>
      <FiEye />
      <Trans>appear</Trans>
    </>,
  ],
  [
    ComponentUniversalEventTrigger.LEAVE_VIEW,
    <>
      <FiEyeOff />
      <Trans>disappear</Trans>
    </>,
  ],
  [
    PluginUniversalEventTrigger.BEFORE_EXEC,
    <>
      <MdBlurCircular />
      <Trans>before execute</Trans>
    </>,
  ],
  [
    PluginUniversalEventTrigger.AFTER_EXEC,
    <>
      <MdBlurCircular />
      <Trans>after execute</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.CLICK,
    <>
      <FiMousePointer />
      <Trans>click</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.MOUSE_ENTER,
    <>
      <MdCallReceived />
      <Trans>mouse in</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.MOUSE_LEAVE,
    <>
      <MdCallMade />
      <Trans>mouse out</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.DOUBLE_CLICK,
    <>
      <FiMousePointer />
      <Trans>double click</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.LONG_PRESS,
    <>
      <MdPanTool />
      <Trans>long press</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.ENTER_VIEW,
    <>
      <FiEye />
      <Trans>appear</Trans>
    </>,
  ],
  [
    HotAreaUniversalEventTrigger.LEAVE_VIEW,
    <>
      <FiEyeOff />
      <Trans>disappear</Trans>
    </>,
  ],
  [
    ContainerUniversalEventTrigger.BEFORE_RENDER,
    <>
      <MdBlurCircular />
      <Trans>before render</Trans>
    </>,
  ],
  [
    ContainerUniversalEventTrigger.AFTER_RENDER,
    <>
      <MdBlurCircular />
      <Trans>after render</Trans>
    </>,
  ],
]);
