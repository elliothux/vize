import {action, observable} from "mobx";
import { Maybe, PageInstance } from "types";
import { createPage } from "../utils";

export class PagesStore {
  @observable
  public pages: PageInstance[] = [createPage("home", true)];

  @action
  public addPage = () => {

  }
}

export const pagesStore = new PagesStore();
