import { action, computed, observable } from "mobx";
import { PageInstance } from "types";
import { createPage } from "../utils";
import { componentsStore } from "./components";

export class PagesStore {
  public init = () => {
    this.addPage(true);
  };

  @observable
  public pages: PageInstance[] = [];

  @observable
  private currentPageIndex: number = 0;

  @computed
  public get currentPage(): PageInstance {
    return this.pages[this.currentPageIndex];
  }

  @action
  public setCurrentPage = (pageIndex: number): void => {
    this.currentPageIndex = pageIndex;
  };

  @action
  public addPage = (isHome?: boolean): void => {
    const page = createPage("new page", isHome);
    this.pages.push(page);
    this.currentPageIndex = this.pages.length - 1;
    componentsStore.addComponentInstancesMap(page.key);
  };

  @action
  public deletePage = (pageIndex: number): void => {
    const { key } = this.pages[pageIndex]!;
    componentsStore.deleteComponentInstancesMap(key);
    this.pages.splice(pageIndex, 1);
  };
}

export const pagesStore = new PagesStore();
