import * as React from "react";
import { observer } from "mobx-react";
import { componentsStore } from "../../states";
import { ComponentItem } from "../ComponentItem";

function IComponentsRender() {
  const { componentInstances } = componentsStore;
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem key={instance.key} instance={instance} />
      ))}
    </>
  );
}

export const ComponentsRender = observer(IComponentsRender);
