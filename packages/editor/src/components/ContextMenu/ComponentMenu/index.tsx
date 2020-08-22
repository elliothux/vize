import * as React from 'react';
import { FiDelete, FiCopy } from 'react-icons/fi';
import { Menu, Item, theme, Separator, animation } from 'react-contexify';
import { useCallback } from 'react';
import { componentsStore, selectStore } from 'states';
import { noop, showContextMenu } from 'utils';
import { ComponentInstance } from 'types';
import { getSimulatorNodeOffset } from 'widgets/Simulator';

interface Props {
  instance: ComponentInstance;
}

export function ComponentContextMenu({ instance }: Props) {
  const deps = [instance.key];
  const onDelete = useCallback(() => componentsStore.deleteComponentInstance(instance.key), deps);
  // const onRename = useCallback(
  //   () => pagesStore.setPageEditing(index, true),
  //   deps
  // );

  return (
    <Menu id={getID(instance.key)} theme={theme.dark} animation={animation.fade}>
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
      {instance.children ? (
        <>
          <Separator />
          <Item onClick={noop}>
            <FiCopy />
            <span>编辑子组件</span>
          </Item>
        </>
      ) : null}
    </Menu>
  );
}

export function showComponentContextMenu(e: React.MouseEvent, componentKey: number, fromIFrame = false) {
  selectStore.selectComponent(componentKey);
  return showContextMenu(fromIFrame ? createMouseEventFromIframe(e) : e, getID(componentKey));
}

function createMouseEventFromIframe(e: React.MouseEvent): MouseEvent {
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
  (event as any).nativeEvent = event;

  return event;
}

function getID(componentKey: number) {
  return `component-${componentKey}`;
}
