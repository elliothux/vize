import { observable, action } from 'mobx';
import { PageRecord } from '../types';
import { queryPages } from '../api';

export class PageStore {
  public init = async () => {
    const [success, data, response] = await queryPages(null, 0);
    if (!success) {
      console.error('query biz failed: ', response);
    }
  };

  @observable
  public loading = true;

  @observable
  public pages: PageRecord[] = [];

  @action
  public setPages = (pages: PageRecord[]) => {
    this.pages = pages;
  };
}
