import { PageInstance, PageRouter } from '../../../types';
import { RenderEntryProps } from '../RenderEntry/types';

export interface RouterProps
  extends Pick<
    RenderEntryProps,
    | 'globalData'
    | 'globalStyle'
    | 'meta'
    | 'sharedComponentInstances'
    | 'sharedPluginInstances'
    | 'pages'
    | 'pageImports'
  > {
  setCurrentPageInstance: (i: PageInstance) => void;
  setRouter: (r: PageRouter) => void;
}
