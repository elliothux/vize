import * as React from 'react';
import { ComponentInstance, MaterialsComponentMeta, Function, WithReactChildren } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponentMeta } from 'runtime';

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
  onContextMenu: Function;
}

export function ComponentMask({ instance, onClick, onDoubleClick, onContextMenu, children }: WithReactChildren<Props>) {
  const {
    info: { name },
  } = useMemo<MaterialsComponentMeta>(() => getMaterialsComponentMeta(instance.component)!, [instance.component]);

  const desc = useMemo(() => (instance.children ? '[双击编辑容器]' : instance.hotAreas ? '[双击编辑热区]' : ''), [
    instance,
  ]);

  return (
    <div
      className="vize-component-item-mask"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <span>
        <span>{name}</span> (key={instance.key}) {desc}
      </span>
      {children}
    </div>
  );
}
