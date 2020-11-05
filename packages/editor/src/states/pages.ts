import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import { PageInstance, PageRouter } from 'types';
import { createPageInstance } from '../utils';
import { componentsStore } from './components';
import { selectStore } from './select';
import { pluginsStore } from './plugins';
import { editStore } from './edit';
import { StoreWithUtils } from './utils';

export class PagesStore extends StoreWithUtils<PagesStore> {
  public init = () => {
    // TODO
    this.addPage(true, 'index');
  };

  @observable
  public pages: PageInstance[] = [];

  @computed
  public get currentPage(): PageInstance {
    return this.pages[selectStore.pageIndex];
  }

  @action
  public setPageEditing = (pageIndex: number, editing: boolean) => {
    this.pages[pageIndex]!.isNameEditing = editing;
  };

  @action
  public addPage = (isHome?: boolean, name?: string): void => {
    const page = createPageInstance(name || 'new page', isHome);
    this.pages.push(page);

    componentsStore.addComponentInstancesMap(page.key);
    if (!editStore.isSinglePageMode) {
      pluginsStore.addPluginInstancesMap(page.key);
    }

    selectStore.selectPage(this.pages.length - 1);
  };

  @action
  public deletePage = (pageIndex: number): void => {
    if (this.pages.length === 1) {
      message.warn('至少保留一个页面');
      return;
    }

    const { key, isHome } = this.pages[pageIndex]!;
    componentsStore.deleteComponentInstancesMap(key);
    if (!editStore.isSinglePageMode) {
      pluginsStore.deletePluginInstancesMap(key);
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
      pages: this.pages.map(({ name, key, path, isHome }) => ({ name, key, path, isHome })),
      currentPage: this.currentPage.key,
      setCurrentPage: (key: number) => {
        const index = this.pages.findIndex(i => i.key === key);
        selectStore.selectPage(index);
      },
    };
  }
}

export const pagesStore = new PagesStore();
