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

export function parseDSL({ global, pageInstances, pluginInstances, editInfo }: DSL) {
  return {
    global,
    pageInstances: parsePageInstancesDSL(pageInstances, global.pageMode),
    pluginInstances: global.pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(pluginInstances!) : undefined,
    editInfo,
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

function parseComponentInstancesDSL(componentInstances: ComponentInstanceDSL[]): ComponentInstance[] {
  return componentInstances.map(({ children, ...component }) => {
    const componentInstance = <ComponentInstance>{
      ...component,
    };

    if (children) {
      componentInstance.children = parseComponentInstancesDSL(children);
    }

    return componentInstance;
  });
}

function parsePluginInstancesDSL(pluginInstances: PluginInstanceDSL[]): PluginInstance[] {
  return pluginInstances;
}
