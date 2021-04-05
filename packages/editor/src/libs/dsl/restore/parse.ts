import { ComponentInstance, ComponentInstanceDSL, DSL, PageInstanceDSL, PageInstance, HotArea } from 'types';

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
      Object.defineProperty(componentInstance, 'parent', {
        get() {
          return parent;
        },
      });
    }

    if (hotAreas) {
      componentInstance.hotAreas = hotAreas.map(i => {
        const hotArea = { ...i } as HotArea;
        Object.defineProperty(hotArea, 'parent', {
          get() {
            return componentInstance;
          },
        });
        return hotArea;
      });
    }

    if (children) {
      componentInstance.children = parseComponentInstancesDSL(children, componentInstance);
    }

    return componentInstance;
  });
}
