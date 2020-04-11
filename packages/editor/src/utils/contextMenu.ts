import * as React from "react";
import { contextMenu } from "react-contexify";
import { preventSyntheticEvent } from "./common";

export function showContextMenu(e: React.MouseEvent, key: string) {
  preventSyntheticEvent(e);
  e.persist();

  // const { zoom } = state.getState();
  const zoom = 100;

  if (zoom === 100) {
    return contextMenu.show({
      id: key,
      event: e
    });
  }

  const event = document.createEvent("MouseEvent");
  event.initMouseEvent(
    e.type,
    e.cancelable,
    e.cancelable,
    window,
    (e as any).detail,
    e.screenX,
    e.screenY,
    e.clientX * (zoom / 100),
    e.clientY * (zoom / 100),
    e.ctrlKey,
    e.altKey,
    e.shiftKey,
    e.metaKey,
    e.button,
    null
  );
  (event as any).nativeEvent = event;

  return contextMenu.show({
    id: key,
    event
  });
}
