import * as React from 'react';
import { FiDelete, FiCopy, FiRefreshCw, FiCornerUpRight, FiPlus } from 'react-icons/fi';
import { Menu, Item, theme, Separator, Submenu, animation } from 'react-contexify';
import { useCallback } from 'react';
import { componentsStore, selectStore, sharedStore } from 'states';
import { noop, preventSyntheticEvent, showContextMenu } from 'utils';
import { ComponentInstance, PageInstance } from 'types';
import { Trans } from 'react-i18next';
import { createMouseEventFromIframe } from '../utils';

interface Props {
  instance: ComponentInstance;
  pages: PageInstance[];
  currentPageIndex: number;
}

export function ComponentContextMenu({ instance, pages, currentPageIndex }: Props) {
  const { key, shared, children } = instance;
  const onDelete = useCallback(() => componentsStore.deleteComponentInstance(instance.key), [key]);
  const onShared = useCallback(() => sharedStore.setComponentInstanceAsShared(key), [key]);
  const onEditChildren = useCallback(() => selectStore.selectContainerComponent(key), [key]);
  // const onRename = useCallback(
  //   () => pagesStore.setPageEditing(index, true),
  //   deps
  // );

  return (
    <Menu id={getID(instance.key)} theme={theme.dark} animation={animation.zoom}>
      {/*<Item onClick={onRename}>*/}
      {/*  <FiEdit />*/}
      {/*  <span>*/}
      {/*    <Trans>rename</Trans>*/}
      {/*  </span>*/}
      {/*</Item>`*/}
      <Item onClick={onDelete}>
        <FiDelete />
        <span>
          <Trans>delete</Trans>
        </span>
      </Item>

      <Item onClick={noop}>
        <FiCopy />
        <span>
          <Trans>copy</Trans>
        </span>
      </Item>

      <Separator />

      {/* TODO */}
      {!shared ? (
        <Item onClick={onShared}>
          <FiRefreshCw />
          <span>
            <Trans>share between pages</Trans>
          </span>
        </Item>
      ) : null}

      <Submenu
        label={
          <>
            <FiCornerUpRight />
            <span>
              <Trans>move to</Trans>
            </span>
          </>
        }
        arrow={null}
      >
        <Item onClick={noop}>
          <FiPlus />
          <span>
            <Trans>new page</Trans>
          </span>
        </Item>
        {pages.map(({ name, key }, index) =>
          shared || index !== currentPageIndex ? (
            <Item key={key} onClick={noop}>
              <span>{name}</span>
            </Item>
          ) : null,
        )}
      </Submenu>

      <Submenu
        label={
          <>
            <FiCopy />
            <span>
              <Trans>copy to</Trans>
            </span>
          </>
        }
        arrow={null}
      >
        <Item onClick={noop}>
          <FiPlus />
          <span>
            <Trans>new page</Trans>
          </span>
        </Item>
        {pages.map(({ name, key }, index) =>
          shared || index !== currentPageIndex ? (
            <Item key={key} onClick={noop}>
              <span>{name}</span>
            </Item>
          ) : null,
        )}
      </Submenu>

      {children ? (
        <>
          <Item onClick={onEditChildren}>
            <FiCopy />
            <span>
              <Trans>edit children components</Trans>
            </span>
          </Item>
        </>
      ) : null}
    </Menu>
  );
}

export function showComponentContextMenu(
  e: React.MouseEvent,
  isShared: boolean,
  fromIFrame: boolean,
  componentKey: number,
  parentKey?: number,
) {
  preventSyntheticEvent(e);
  selectStore.selectComponent(isShared, componentKey, parentKey);
  return showContextMenu(fromIFrame ? createMouseEventFromIframe(e) : e, getID(componentKey));
}

function getID(componentKey: number) {
  return `component-${componentKey}`;
}
