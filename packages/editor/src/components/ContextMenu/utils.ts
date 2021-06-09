import * as React from 'react';
import { getSimulatorNodeOffset } from 'components/Simulator';

export function createMouseEventFromIframe(e: React.MouseEvent): MouseEvent {
  e.persist();

  const [deltaX, deltaY] = getSimulatorNodeOffset();
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(
    e.type,
    e.cancelable,
    e.cancelable,
    window,
    e.detail,
    e.screenX,
    e.screenY,
    e.clientX + deltaX,
    e.clientY + deltaY,
    e.ctrlKey,
    e.altKey,
    e.shiftKey,
    e.metaKey,
    e.button,
    null,
  );

  return event;
}
