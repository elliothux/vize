import { ComponentInstance, ComponentInstanceDSL, DSL, PageInstanceDSL, PageInstance } from 'types';

export function parseDSL(dsl: DSL) {
  const { pageInstances, sharedComponentInstances } = dsl;
  return {
    ...dsl,
    pageInstances: parsePageInstancesDSL(pageInstances),
    sharedComponentInstances: sharedComponentInstances
      ? parseComponentInstancesDSL(sharedComponentInstances)
      : undefined,
  };
}

function parsePageInstancesDSL(pages: PageInstanceDSL[]): PageInstance[] {
  return pages.map(page => {
    return {
      ...page,
      componentInstances: parseComponentInstancesDSL(page.componentInstances),
    };
  });
}

function parseComponentInstancesDSL(
  componentInstances: ComponentInstanceDSL[],
  parent?: ComponentInstance,
): ComponentInstance[] {
  return componentInstances.map(({ children, hotAreas, ...component }) => {
    const componentInstance = <ComponentInstance>{
      ...component,
    };

    if (parent) {
      componentInstance.parent = parent;
    }

    if (hotAreas) {
      componentInstance.hotAreas = hotAreas.map(i => ({ ...i, parent: componentInstance }));
    }

    if (children) {
      componentInstance.children = parseComponentInstancesDSL(children, componentInstance);
    }

    return componentInstance;
  });
}
