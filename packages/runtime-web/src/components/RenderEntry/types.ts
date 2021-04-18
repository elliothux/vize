import {
  ComponentInstance,
  EventInstance,
  GlobalMeta,
  PageInstance,
  PluginInstance,
  RouterPageItem,
} from '../../../types';

export interface RenderEntryProps {
  meta: GlobalMeta;
  globalData: object;
  globalStyle: object;
  globalEvents: EventInstance[];
  sharedComponentInstances: ComponentInstance[];
  sharedPluginInstances: PluginInstance[];
  pages: RouterPageItem[];
  pageImports: {
    [key: number]: () => Promise<{ pageInstance: PageInstance }>;
  };
}
