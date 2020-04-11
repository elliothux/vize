import * as React from "react";
import { FiDelete, FiHome } from "react-icons/fi";
import { Menu, Item, theme, animation } from "react-contexify";
import { useCallback } from "react";
import { pagesStore } from "states";
import { showContextMenu } from "utils";

interface Props {
  index: number;
  pageKey: number;
}

export function PageContextMenu({ index, pageKey }: Props) {
  const onDelete = useCallback(() => pagesStore.deletePage(index), []);
  const onSetHome = useCallback(() => pagesStore.setPageHome(index), []);

  return (
    <Menu id={getID(pageKey)} theme={theme.dark} animation={animation.zoom}>
      <Item onClick={onDelete}>
        <FiDelete />
        <span>删除</span>
      </Item>
      <Item onClick={onSetHome}>
        <FiHome />
        <span>设为主页面</span>
      </Item>
      {/*<Item onClick={onCopy}>*/}
      {/*  <FiCopy />*/}
      {/*  <span>复制</span>*/}
      {/*</Item>*/}
      {/*<Separator />*/}
    </Menu>
  );
}

export function showPageContextMenu(e: React.MouseEvent, pageKey: number) {
  return showContextMenu(e, getID(pageKey));
}

function getID(pageKey: number) {
  return `page-${pageKey}`;
}
