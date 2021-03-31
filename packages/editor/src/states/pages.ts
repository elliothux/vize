import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import { PageInstance, PageRouter } from 'types';
import { i18n } from 'i18n';
import { createPageInstance } from 'utils';
import {
  addPagePluginInstanceIndexMap,
  addPageComponentInstanceIndexMap,
  deletePageComponentInstanceIndexMap,
  deletePagePluginInstanceIndexMap,
} from 'libs';
import { StoreWithUtils } from './utils';
import { selectStore } from './select';

export class PagesStore extends StoreWithUtils<PagesStore> {
  public init = () => {
    this.addPage(true, 'default page');
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
  public addPage = (isHome?: boolean, name?: string): void => {
    const page = createPageInstance(name || 'new page', isHome);
    this.pages.push(page);

    const { key } = page;
    addPageComponentInstanceIndexMap(key);
    addPagePluginInstanceIndexMap(key);

    selectStore.selectPage(this.pages.length - 1);
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

  @computed
  get router(): PageRouter {
    return {
      pages: this.pages,
      currentPage: this.currentPage.key,
      setCurrentPage: (key: number) => {
        const index = this.pages.findIndex(i => i.key === key);
        selectStore.selectPage(index);
      },
    };
  }
}

export const pagesStore = new PagesStore();
