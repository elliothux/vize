import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import { PageInstance, PageRouter } from 'types';
import { i18n } from 'i18n';
import {
  addPageComponentInstanceIndexMap,
  addPagePluginInstanceIndexMap,
  createPageInstance,
  deletePageComponentInstanceIndexMap,
  deletePagePluginInstanceIndexMap,
} from 'utils';
import { StoreWithUtils } from './utils';
import { componentsStore } from './components';
import { selectStore } from './select';
import { pluginsStore } from './plugins';
import { editStore } from './edit';
import { containerStore } from './container';

export class PagesStore extends StoreWithUtils<PagesStore> {
  public init = () => {
    this.addPage(true, 'default page');
  };

  @observable
  public pages: PageInstance[] = [];

  public getPageByKey = (key: number) => {
    return this.pages.find(p => p.key === key);
  };

  @computed
  public get currentPage(): PageInstance {
    return this.pages[selectStore.pageIndex];
  }

  @action
  public addPage = (isHome?: boolean, name?: string): void => {
    const page = createPageInstance(name || 'new page', isHome);
    this.pages.push(page);

    const { key } = page;
    addPageComponentInstanceIndexMap(key);
    addPagePluginInstanceIndexMap(key);
    if (!editStore.isSinglePageMode) {
      containerStore.addContainerEventInstancesMap(key);
    }

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
    if (!editStore.isSinglePageMode) {
      containerStore.deleteContainerEventInstancesMap(key);
    }

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
