import * as React from "react";
import {
  ComponentInstance,
  MaterialsComponentMeta,
  Function
} from "../../types";
import { useMemo } from "react";
import { materialsStore } from "../../states";

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onContextMenu: Function;
}

export function ComponentMask({
  instance,
  selected,
  onClick,
  onContextMenu
}: Props) {
  const {
    info: { name }
  } = useMemo<MaterialsComponentMeta>(
    () => materialsStore.getComponentMeta(instance.component),
    [instance.component]
  );

  return (
    <div
      className="vize-component-item-mask"
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <span>
        {name} (key={instance.key})
      </span>
    </div>
  );
}
