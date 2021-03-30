import { DSL, LayoutMode, PageMode } from '../types';
import { PageEntity } from '../modules/page/page.entity';

export function generateDSL({
  id,
  key,
  layoutMode,
  pageMode,
  container,
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
}: PageEntity): DSL {
  const { lib, name } = JSON.parse(container);
  return {
    pageKey: key,
    container: {
      lib,
      name,
    },
    global: {
      metaInfo: {
        title,
        desc,
        duration: longTerm
          ? null
          : [getDateTimeString(startTime), getDateTimeString(endTime)],
        expiredJump,
        id,
        key,
        isEditor: false,
        isTemplate: !isTemplate,
      },
      globalProps: JSON.parse(globalProps),
      globalStyle: JSON.parse(globalStyle),
      containerEvents: JSON.parse(containerEvents),
    },
    editInfo: {
      layoutMode: layoutMode as LayoutMode,
      pageMode: pageMode as PageMode,
      maxKeys: JSON.parse(maxKeys!),
    },
    sharedComponentInstances: sharedComponentInstances
      ? JSON.parse(sharedComponentInstances)
      : undefined,
    pageInstances: JSON.parse(pageInstances),
    pluginInstances:
      pageMode === PageMode.SINGLE
        ? JSON.parse(pluginInstances || '[]')
        : undefined,
  };
}

function getDateTimeString(date: Date) {
  return date.toISOString().split('T')[0];
}
