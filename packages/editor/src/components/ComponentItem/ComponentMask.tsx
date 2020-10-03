import * as React from 'react';
import { ComponentInstance, Function } from 'types';
// import { useMemo } from 'react';
// import { materialsStore } from 'states';

interface Props {
  tag: string;
  subTag?: string;
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
  onContextMenu: Function;
}

export function ComponentMask({ tag, subTag, onClick, onDoubleClick, onContextMenu }: Props) {
  // const {
  //   info: { name },
  // } = useMemo<MaterialsComponentMeta>(() => materialsStore.getComponentMeta(instance.component), [instance.component]);

  return (
    <div
      className="vize-component-item-mask"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <span>
        {tag} {subTag}
      </span>
    </div>
  );
}
