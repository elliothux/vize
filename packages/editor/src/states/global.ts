import { action, observable, toJS } from 'mobx';
import { injectGlobalReadonlyGetter, isDev } from 'utils';
import { GlobalMeta, Maybe } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  /**
   * @desc GlobalProps & GlobalStyle
   * @struct object
   */
  @observable
  public globalProps: object = {};

  @action
  public setGlobalProps = (data: object) => {
    this.globalProps = data;
  };

  @observable
  public globalStyle: object = {};

  @action
  public setGlobalStyle = (data: object) => {
    this.globalStyle = data;
  };

  /**
   * @desc GlobalMeta
   */
  @observable
  public metaInfo: GlobalMeta = {
    title: 'vize page',
    desc: '',
    duration: null,
    expiredJump: '',
    id: null,
    key: '',
    isTemplate: false,
    isEditor: true,
  };

  @action
  public setMetaInfo = (data: Partial<GlobalMeta>) => {
    this.metaInfo = {
      ...this.metaInfo,
      ...data,
    };
  };

  @action
  public setPageTitle = (title: string) => {
    this.metaInfo.title = title;
  };

  @action
  public setPageDesc = (desc: string) => {
    this.metaInfo.desc = desc;
  };

  @action
  public setPageDuration = (duration: Maybe<[string, string]>) => {
    this.metaInfo.duration = duration;
  };

  @action
  public setPageExpiredJumpURL = (url: string) => {
    this.metaInfo.expiredJump = url;
  };
}

export const globalStore = new GlobalStore();

if (isDev()) {
  setTimeout(() => injectGlobalReadonlyGetter('vize_global_store', () => toJS(globalStore)), 1000);
}
