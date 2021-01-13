import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  LayoutMode,
  PageData,
  PageDSL,
  PageInstance,
  PageMode,
  PluginInstance,
  PluginInstanceDSL,
} from 'types';
import { PageRecordWithHistory } from 'sharedTypes';

export function parseDSLFromCGIRecord({
  layoutMode,
  pageMode,
  latestHistory: {
    title,
    desc,
    startTime,
    endTime,
    expiredJump,
    globalProps,
    globalStyle,
    pageInstances,
    pluginInstances,
    sharedComponentInstances,
    maxKeys,
  },
}: PageRecordWithHistory): ReturnType<typeof parseDSL> {
  return {
    global: {
      metaInfo: {
        title,
        desc,
        duration: startTime && endTime ? [new Date(startTime).getTime(), new Date(endTime).getTime()] : null,
        expiredJump,
      },
      globalProps: JSON.parse(globalProps),
      globalStyle: JSON.parse(globalStyle),
    },
    editInfo: {
      layoutMode: layoutMode as LayoutMode,
      pageMode: pageMode as PageMode,
      maxKeys: JSON.parse(maxKeys!),
    },
    sharedComponentInstances: sharedComponentInstances
      ? parseComponentInstancesDSL(JSON.parse(sharedComponentInstances))
      : undefined,
    pageInstances: parsePageInstancesDSL(JSON.parse(pageInstances), pageMode as PageMode),
    pluginInstances: pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(JSON.parse(pluginInstances!)) : undefined,
  };
}

export function parseDSL({ global, pageInstances, pluginInstances, sharedComponentInstances, editInfo }: DSL) {
  return {
    global,
    editInfo,
    sharedComponentInstances: sharedComponentInstances
      ? parseComponentInstancesDSL(sharedComponentInstances)
      : undefined,
    pageInstances: parsePageInstancesDSL(pageInstances, editInfo.pageMode),
    pluginInstances: editInfo.pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(pluginInstances!) : undefined,
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
