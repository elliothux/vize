import * as React from "react";
import { ComponentInstance } from "../../types";
import { useMemo } from "react";
import { getMaterialsComponent } from "../../utils";

interface Props {
  instance: ComponentInstance;
}

export function ComponentView({ instance }: Props) {
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
