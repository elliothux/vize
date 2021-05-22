import { ComponentInstanceDSL, ComponentInstance } from '@vize/types';

export function transformComponentDSL2Instance(dsl: ComponentInstanceDSL[]): ComponentInstance[] {
  return dsl.map(component => {
    if (component.hotAreas) {
      component.hotAreas = component.hotAreas.map(hotArea => ({ ...hotArea, parent: component }));
    }

    if (component.children) {
      component.children = component.children.map(child => ({ ...child, parent: component }));
    }

    return component as ComponentInstance;
  });
}
