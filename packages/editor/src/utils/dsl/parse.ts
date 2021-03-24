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
import { PageRecordWithHistory, UserRecord } from 'sharedTypes';
import { getDateTimeString } from '../time';

export function parseDSLFromCGIRecord({
  id,
  key,
  layoutMode,
  pageMode,
  isTemplate,
  latestHistory: {
    title,
    desc,
    startTime,
    endTime,
    expiredJump,
    globalProps,
    globalStyle,
    containerEvents,
    pageInstances,
    pluginInstances,
    sharedComponentInstances,
    maxKeys,
  },
  owner,
}: PageRecordWithHistory): [ReturnType<typeof parseDSLFromLocalStorage>, UserRecord] {
  const longTerm = !(startTime && endTime);
  return [
    {
      global: {
        metaInfo: {
          title,
          desc,
          longTerm,
          duration: longTerm ? null : [getDateTimeString(startTime), getDateTimeString(endTime)],
          expiredJump,
          id,
          key,
          isEditor: true,
          isTemplate: !!isTemplate,
        },
        globalProps: JSON.parse(globalProps),
        globalStyle: JSON.parse(globalStyle),
        containerEvents: JSON.parse(containerEvents),
      },
      editInfo: {
        layoutMode: layoutMode as LayoutMode,
        pageMode: pageMode as PageMode,
        maxKeys: maxKeys ? JSON.parse(maxKeys) : null,
      },
      sharedComponentInstances: sharedComponentInstances
        ? parseComponentInstancesDSL(JSON.parse(sharedComponentInstances))
        : undefined,
      pageInstances: parsePageInstancesDSL(JSON.parse(pageInstances), pageMode as PageMode),
      pluginInstances:
        pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(JSON.parse(pluginInstances || '[]')) : undefined,
    },
    owner,
  ];
}

export function parseDSLFromLocalStorage({
  global,
  pageInstances,
  pluginInstances,
  sharedComponentInstances,
  editInfo,
}: DSL) {
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
