import * as React from "react";
import { FiDelete, FiHome, FiCopy, FiEdit } from "react-icons/fi";
import { Menu, Item, theme, Separator } from "react-contexify";
import { useCallback } from "react";
import { componentsStore, pagesStore, selectStore } from "states";
import { noop, showContextMenu } from "utils";
import { ComponentInstance } from "../../../types";

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
  componentKey: number
) {
  selectStore.selectComponent(componentKey);
  return showContextMenu(e as any, getID(componentKey));
}

function getID(componentKey: number) {
  return `component-${componentKey}`;
}
