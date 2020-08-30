import { parseDSL } from './parse';
import { ComponentInstance, DSL } from '../../types';
import { componentsStore, globalStore, pagesStore } from '../../states';
import { addPageComponentInstanceIndexMap, generateComponentsIndex } from '../indexMap';

export function restoreState({ global, pages }: ReturnType<typeof parseDSL>) {
  restoreGlobalState(global);
  restorePageInstances(pages);
}

function restoreGlobalState({ layoutMode, pageMode, globalProps, globalStyle, metaInfo }: DSL['global']) {
  return globalStore.setState(global => {
    global.layoutMode = layoutMode;
    global.pageMode = pageMode;
    global.globalProps = globalProps;
    global.globalStyle = globalStyle;
    global.metaInfo = metaInfo;
  });
}

// function restoreComponentInstances(componentInstances: ComponentInstance[]) {
//   componentsStore.setState(componentsStore => {
//     componentsStore.componentInstances = componentInstances;
//   });
// }

function restorePageInstances(pages: ReturnType<typeof parseDSL>['pages']) {
  return pages.forEach(([pageInstance, { componentInstances }]) => {
    pagesStore.setState(pagesStore => pagesStore.pages.push(pageInstance));
    restoreComponentInstances(pageInstance.key, componentInstances);
  });
}

function restoreComponentInstances(pageKey: number, componentInstances: ComponentInstance[]) {
  componentsStore.setState(componentsStore => {
    componentsStore.pagesComponentInstancesMap[pageKey] = componentInstances;
  });

  const indexMap = generateComponentsIndex(componentInstances);
  addPageComponentInstanceIndexMap(pageKey, indexMap);
}
