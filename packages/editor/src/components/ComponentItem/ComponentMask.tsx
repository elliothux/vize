import * as React from 'react';
import { ComponentInstance, MaterialsComponentMeta, Function, WithReactChildren } from 'types';
import { useMemo } from 'react';
import { getMaterialsComponentMeta } from 'runtime';
import { observer } from 'mobx-react';
import { editStore } from 'states';

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
  onContextMenu: Function;
}

function IComponentMask({ instance, onClick, onDoubleClick, onContextMenu, children }: WithReactChildren<Props>) {
  const {
    info: { name },
  } = useMemo<MaterialsComponentMeta>(() => getMaterialsComponentMeta(instance.component)!, [instance.component]);

  const desc = useMemo(() => (instance.children ? '[双击编辑容器]' : instance.hotAreas ? '[双击编辑热区]' : ''), [
    instance,
  ]);

  const { previewMode } = editStore;

  return (
    <div
      className={`vize-component-item-mask${previewMode ? ' preview-mode' : ''}`}
      onClick={previewMode ? undefined : onClick}
      onDoubleClick={previewMode ? undefined : onDoubleClick}
      onContextMenu={previewMode ? undefined : onContextMenu}
    >
      <span>
        <span>{name}</span> (key={instance.key}) {desc}
      </span>
      {children}
    </div>
  );
}

export const ComponentMask = observer(IComponentMask);
