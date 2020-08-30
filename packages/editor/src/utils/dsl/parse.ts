import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  PageData,
  PageDSL,
  PageInstance,
  PageMode,
  PluginInstance,
  PluginInstanceDSL,
} from 'types';

export function parseDSL({ global, pageInstances, pluginInstances }: DSL) {
  return {
    global,
    pages: parsePageInstancesDSL(pageInstances, global.pageMode),
    pluginInstances: global.pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(pluginInstances!) : undefined,
  };
}

function parsePageInstancesDSL(pages: PageDSL[], pageMode: PageMode): [PageInstance, PageData][] {
  return pages.map(page => {
    return [
      {
        ...page,
        isNameEditing: false,
      },
      {
        componentInstances: parseComponentInstancesDSL(page.componentInstances),
        pluginInstances: pageMode === PageMode.MULTI ? parsePluginInstancesDSL(page.pluginInstances!) : [],
      },
    ];
  });
}

function parseComponentInstancesDSL(
  componentInstances: ComponentInstanceDSL[],
  parent?: ComponentInstance,
): ComponentInstance[] {
  return componentInstances.map(({ children, ...component }) => {
    const componentInstance = <ComponentInstance>{
      ...component,
    };

    if (parent) {
      componentInstance.parent = parent;
    }

    if (children) {
      componentInstance.children = parseComponentInstancesDSL(children, componentInstance);
    }

    return componentInstance;
  });
}

function parsePluginInstancesDSL(pluginInstances: PluginInstanceDSL[]): PluginInstance[] {
  return pluginInstances;
}
