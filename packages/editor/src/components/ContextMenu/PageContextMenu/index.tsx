import * as React from 'react';
import { FiDelete, FiHome, FiCopy, FiEdit } from 'react-icons/fi';
import { Menu, Item, theme, Separator } from 'react-contexify';
import { useCallback } from 'react';
import { pagesStore } from 'states';
import { noop, showContextMenu } from 'utils';

interface Props {
  index: number;
  pageKey: number;
}

export function PageContextMenu({ index, pageKey }: Props) {
  const deps = [index];
  const onDelete = useCallback(() => pagesStore.deletePage(index), deps);
  const onSetHome = useCallback(() => pagesStore.setPageHome(index), deps);
  const onRename = useCallback(() => pagesStore.setPageEditing(index, true), deps);

  return (
    <Menu id={getID(pageKey)} theme={theme.dark}>
      <Item onClick={onRename}>
        <FiEdit />
        <span>重命名</span>
      </Item>
      <Item onClick={onSetHome}>
        <FiHome />
        <span>设为主页面</span>
      </Item>
      <Separator />
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

export function showPageContextMenu(e: React.MouseEvent, pageKey: number) {
  return showContextMenu(e, getID(pageKey));
}

function getID(pageKey: number) {
  return `page-${pageKey}`;
}
