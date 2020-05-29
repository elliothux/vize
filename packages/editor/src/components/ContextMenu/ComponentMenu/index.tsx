import * as React from "react";
import { FiDelete, FiHome, FiCopy, FiEdit } from "react-icons/fi";
import { Menu, Item, theme, Separator } from "react-contexify";
import { useCallback } from "react";
import { componentsStore, pagesStore, selectStore } from "states";
import { noop, showContextMenu } from "utils";
import { ComponentInstance } from "../../../types";
import { getSimulatorClientRect } from "../../Simulator";

interface Props {
  instance: ComponentInstance;
}

export function ComponentContextMenu({ instance }: Props) {
  const deps = [instance.key];
  const onDelete = useCallback(
    () => componentsStore.deleteComponentInstance(instance.key),
    deps
  );
  // const onRename = useCallback(
  //   () => pagesStore.setPageEditing(index, true),
  //   deps
  // );

  return (
    <Menu id={getID(instance.key)} theme={theme.dark}>
      {/*<Item onClick={onRename}>*/}
      {/*  <FiEdit />*/}
      {/*  <span>重命名</span>*/}
      {/*</Item>*/}
      <Item onClick={onDelete}>
        <FiDelete />
        <span>删除</span>
      </Item>
      <Item onClick={noop}>
        <FiCopy />
        <span>复制</span>
      </Item>
    </Menu>
  );
}

export function showComponentContextMenu(
  e: React.MouseEvent,
  componentKey: number,
  fromIFrame: boolean = false
) {
  selectStore.selectComponent(componentKey);
  return showContextMenu(
    fromIFrame ? createMouseEventFromIframe(e) : e,
    getID(componentKey)
  );
}

function createMouseEventFromIframe(e: React.MouseEvent): MouseEvent {
  e.persist();

  const [deltaX, deltaY] = getSimulatorClientRect();
  const event = document.createEvent("MouseEvent");
  debugger;
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
    null
  );
  (event as any).nativeEvent = event;

  return event;
}

function getID(componentKey: number) {
  return `component-${componentKey}`;
}
