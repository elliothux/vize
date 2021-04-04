import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import { PageInstance, PageRouter } from 'types';
import { i18n } from 'i18n';
import {
  addPagePluginInstanceIndexMap,
  addPageComponentInstanceIndexMap,
  deletePageComponentInstanceIndexMap,
  deletePagePluginInstanceIndexMap,
  createPageInstance,
} from 'libs';
import { onCustomEvent, cancelCustomEvent, emitCustomEvent, generatePageEventHandlers } from 'runtime';
import { StoreWithUtils } from './utils';
import { selectStore } from './select';
import { globalStore } from './global';
import { PageUniversalEventTrigger } from '@vize/types';

export class PagesStore extends StoreWithUtils<PagesStore> {
  public init = () => {
    this.addPage(false, true, 'default page');
  };

  @observable
  public pages: PageInstance[] = [];

  @computed
  public get currentPage(): PageInstance {
    return this.pages[selectStore.pageIndex];
  }

  @action
  public setCurrentPage = (setter: (page: PageInstance) => PageInstance | void) => {
    const page = this.pages[selectStore.pageIndex];
    const newPage = setter(page);
    if (newPage) {
      this.pages[selectStore.pageIndex] = newPage;
    }
    return newPage;
  };

  @action
  public addPage = (select: boolean, isHome?: boolean, name?: string): void => {
    const page = createPageInstance(name || 'new page', isHome);
    this.pages.push(page);

    const { key } = page;
    addPageComponentInstanceIndexMap(key);
    addPagePluginInstanceIndexMap(key);

    if (select) {
      selectStore.selectPage(this.pages.length - 1);
    }
  };

  @action
  public deletePage = (pageIndex: number): void => {
    if (this.pages.length === 1) {
      message.warn(i18n.t('must keep at least one page'));
      return;
    }

    const { key, isHome } = this.pages[pageIndex]!;
    deletePageComponentInstanceIndexMap(key);
    deletePagePluginInstanceIndexMap(key);

    this.pages.splice(pageIndex, 1);

    if (selectStore.pageIndex >= this.pages.length) {
      selectStore.selectPage(pageIndex - 1);
    }

    if (isHome) {
      this.pages[0]!.isHome = true;
    }
  };

  @action
  public setPageHome = (pageIndex: number): void => {
    this.pages.find(i => i.isHome)!.isHome = false;
    this.pages[pageIndex].isHome = true;
  };

  @action
  public setPageName = (pageIndex: number, name: string): void => {
    this.pages[pageIndex].name = name;
  };

  @action
  public setCurrentPageData = (data: object) => {
    return this.setCurrentPage(page => {
      page.data = { ...page.data, ...data };
    });
  };

  @action
  public setCurrentPageStyle = (style: object) => {
    return this.setCurrentPage(page => {
      page.style = { ...page.style, ...style };
    });
  };

  public executePageEventCallbacks = async (index: number, type: PageUniversalEventTrigger) => {
    const { globalData: global, metaInfo: meta } = globalStore;
    const { events } = this.pages[index]!;
    const { [type]: callback } = generatePageEventHandlers(events, this.router);
    if (callback) {
      await callback(null, { global, meta });
    }
  };

  @computed
  get router(): PageRouter {
    return {
      pages: this.pages.map(page => ({
        ...page,
        on: (eventName: string, callback: Function) => onCustomEvent('page', eventName, callback, page.key),
        cancel: (eventName: string, callback: Function) => cancelCustomEvent('page', eventName, callback, page.key),
        emit: (eventName: string) => {
          const { metaInfo: meta, globalData: global } = globalStore;
          return emitCustomEvent(page.events, eventName, meta, global, this.router);
        },
      })),
      currentPage: this.currentPage.key,
      setCurrentPage: (key: number) => {
        const index = this.pages.findIndex(i => i.key === key);
        selectStore.selectPage(index);
      },
    };
  }
}

export const pagesStore = new PagesStore();
