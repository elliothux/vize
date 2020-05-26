import * as React from "react";
import { ComponentInstance } from "../../types";
import { getMaterialsComponent } from "../../utils";
import { useMemo } from "react";

interface Props {
  instance: ComponentInstance;
}

export function ComponentItem({ instance }: Props) {
  const { key, component, data } = instance;

  const ComponentRender = useMemo(() => getMaterialsComponent(component)!, [
    component
  ]);

  return (
    <ComponentRender
      componentKey={key}
      data={data}
      style={{}}
      instance={instance}
    />
  );
}
