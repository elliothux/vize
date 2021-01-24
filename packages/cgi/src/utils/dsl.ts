import { DSL, LayoutMode, PageMode } from 'types';
import { PageEntity } from 'modules/page/page.entity';

export function generateDSL({
  id,
  key,
  layoutMode,
  pageMode,
  container,
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
        duration:
          startTime && endTime
            ? [new Date(startTime).getTime(), new Date(endTime).getTime()]
            : null,
        expiredJump,
        id,
        key,
        isEditor: false,
        isTemplate: false, // TODO
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
      ? JSON.parse(sharedComponentInstances)
      : undefined,
    pageInstances: JSON.parse(pageInstances),
    pluginInstances:
      pageMode === PageMode.SINGLE ? JSON.parse(pluginInstances!) : undefined,
  };
}
