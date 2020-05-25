import * as React from "react";
import { observer } from "mobx-react";
import { componentsStore } from "../../states";
import { getMaterialsComponent } from "../../utils";

function IComponentsRender() {
  const { componentInstances } = componentsStore;
  return (
    <>
      {componentInstances.map(instance => {
        const { key, component, data } = instance;
        const ComponentRender = getMaterialsComponent(component)!;
        return (
          <ComponentRender
            key={key}
            data={data}
            style={{}}
            instance={instance}
          />
        );
      })}
    </>
  );
}

export const ComponentsRender = observer(IComponentsRender);
