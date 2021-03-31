import {
  ComponentInstance,
  ComponentInstanceDSL,
  DSL,
  PageInstanceDSL,
  PageInstance,
  PageMode,
  PluginInstance,
  PluginInstanceDSL,
} from 'types';
import { PageRecordWithHistory, UserRecord } from 'sharedTypes';

export function parseDSLFromCGIRecord({
  id,
  key,
  layoutMode,
  pageMode,
  isTemplate,
  latestHistory: {
    title,
    desc,
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
  return [{}, owner];
  // return [
  //   {
  //     global: {
  //       globalProps: JSON.parse(globalProps),
  //       globalStyle: JSON.parse(globalStyle),
  //       containerEvents: JSON.parse(containerEvents),
  //     },
  //     meta: {
  //       title,
  //       desc,
  //       id,
  //       key,
  //       isEditor: true,
  //       isTemplate: !!isTemplate,
  //     },
  //     editInfo: {
  //       layoutMode: layoutMode as LayoutMode,
  //       pageMode: pageMode as PageMode,
  //       maxKeys: maxKeys ? JSON.parse(maxKeys) : null,
  //     },
  //     sharedComponentInstances: sharedComponentInstances
  //       ? parseComponentInstancesDSL(JSON.parse(sharedComponentInstances))
  //       : undefined,
  //     pageInstances: parsePageInstancesDSL(JSON.parse(pageInstances), pageMode as PageMode),
  //     pluginInstances:
  //       pageMode === PageMode.SINGLE ? parsePluginInstancesDSL(JSON.parse(pluginInstances || '[]')) : undefined,
  //   },
  //   owner,
  // ];
}

export function parseDSLFromLocalStorage(dsl: DSL) {
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
