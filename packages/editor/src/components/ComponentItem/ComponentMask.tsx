import * as React from 'react';
import { ComponentInstance, MaterialsComponentMeta, Function } from 'types';
import { useMemo } from 'react';
import { materialsStore } from 'states';

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
  onContextMenu: Function;
}

export function ComponentMask({ instance, onClick, onDoubleClick, onContextMenu }: Props) {
  const {
    info: { name },
  } = useMemo<MaterialsComponentMeta>(() => materialsStore.getComponentMeta(instance.component), [instance.component]);

  return (
    <div
      className="vize-component-item-mask"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <span>
        {name} (key={instance.key})
      </span>
    </div>
  );
}
