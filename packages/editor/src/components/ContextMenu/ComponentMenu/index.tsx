import * as React from 'react';
import { FiDelete, FiCopy, FiRefreshCw, FiCornerUpRight } from 'react-icons/fi';
import { Menu, Item, theme, Separator, Submenu, animation } from 'react-contexify';
import { useCallback } from 'react';
import { componentsStore, selectStore, sharedStore } from 'states';
import { noop, preventSyntheticEvent, showContextMenu } from 'utils';
import { ComponentInstance, PageInstance } from 'types';
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
  // const onRename = useCallback(
  //   () => pagesStore.setPageEditing(index, true),
  //   deps
  // );

  return (
    <Menu id={getID(instance.key)} theme={theme.dark} animation={animation.zoom}>
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

      <Separator />

      {/* TODO */}
      {!shared ? (
        <Item onClick={onShared}>
          <FiRefreshCw />
          <span>在页面间共享</span>
        </Item>
      ) : null}

      <Submenu
        label={
          <>
            <FiCornerUpRight />
            <span>移动到</span>
          </>
        }
        arrow={null}
      >
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
            <span>复制到</span>
          </>
        }
        arrow={null}
      >
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
          <Item onClick={noop}>
            <FiCopy />
            <span>编辑子组件</span>
          </Item>
        </>
      ) : null}
    </Menu>
  );
}

export function showComponentContextMenu(
  e: React.MouseEvent,
  isShared: boolean,
  componentKey: number,
  fromIFrame = false,
) {
  preventSyntheticEvent(e);
  selectStore.selectComponent(isShared, componentKey);
  return showContextMenu(fromIFrame ? createMouseEventFromIframe(e) : e, getID(componentKey));
}

function getID(componentKey: number) {
  return `component-${componentKey}`;
}
