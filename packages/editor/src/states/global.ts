import { action, observable, toJS } from 'mobx';
import { defaultPageStyle, injectGlobalReadonlyGetter, isDev } from 'utils';
import { GlobalMeta, GlobalStyle, Maybe } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  @observable
  public globalProps: object = {};

  @action
  public setGlobalProps = (data: object) => {
    this.globalProps = data;
  };

  @observable
  public globalStyle: GlobalStyle = defaultPageStyle;

  @action
  public setGlobalStyle = (data: GlobalStyle) => {
    this.globalStyle = data;
  };

  @observable
  public metaInfo: GlobalMeta = {
    title: 'vize page',
    desc: '',
    duration: null,
    expiredJump: '',
  };

  @action
  public setMetaInfo = (data: GlobalMeta) => {
    this.metaInfo = data;
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
  public setPageDuration = (duration: Maybe<[number, number]>) => {
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
