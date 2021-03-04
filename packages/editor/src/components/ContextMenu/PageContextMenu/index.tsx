import * as React from 'react';
import { FiDelete, FiHome, FiCopy, FiEdit } from 'react-icons/fi';
import { Menu, Item, theme, Separator } from 'react-contexify';
import { useCallback } from 'react';
import { pagesStore } from 'states';
import { noop, preventSyntheticEvent, showContextMenu } from 'utils';
import { Trans } from 'react-i18next';

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
        <span>
          <Trans>rename</Trans>
        </span>
      </Item>
      <Item onClick={onSetHome}>
        <FiHome />
        <span>
          <Trans>set as home</Trans>
        </span>
      </Item>
      <Separator />
      <Item onClick={onDelete}>
        <FiDelete />
        <span>
          <Trans>delete</Trans>
        </span>
      </Item>
      <Item onClick={noop}>
        <FiCopy />
        <span>
          <Trans>duplicate</Trans>
        </span>
      </Item>
    </Menu>
  );
}

export function showPageContextMenu(e: React.MouseEvent, pageKey: number) {
  preventSyntheticEvent(e);
  return showContextMenu(e, getID(pageKey));
}

function getID(pageKey: number) {
  return `page-${pageKey}`;
}
