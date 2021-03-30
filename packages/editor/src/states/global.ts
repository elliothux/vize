import { action, observable } from 'mobx';
import { getQueryParams } from 'utils';
import { GlobalMeta } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { id, key } = getQueryParams();
    this.metaInfo.id = id;
    this.metaInfo.key = key;
  }

  /**
   * @desc GlobalData & GlobalStyle
   * @struct object
   */
  @observable
  public globalData: object = {};

  @action
  public setGlobalData = (data: object) => (this.globalData = data);

  @observable
  public globalStyle: object = {};

  @action
  public setGlobalStyle = (data: object) => (this.globalStyle = data);

  /**
   * @desc GlobalMeta
   */
  @observable
  public metaInfo: GlobalMeta = {
    title: 'vize page',
    desc: '',
    id: null,
    key: '',
    isTemplate: false,
    isEditor: true,
  };

  public setMetaInfo = (data: Partial<GlobalMeta>) => (this.metaInfo = { ...this.metaInfo, ...data });
}

export const globalStore = new GlobalStore();
