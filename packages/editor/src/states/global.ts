import { action, computed, observable, toJS } from 'mobx';
import { defaultPageStyle, getQueryParams, injectGlobalReadonlyGetter, isDev } from 'utils';
import { GlobalMeta, GlobalStyle, LayoutMode, Maybe, PageMode } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { key, libs, debugPorts, container } = getQueryParams();
    this.pageKey = key;
    this.libNames = libs;
    this.containerName = container;
    this.debugPorts = debugPorts;
    this.mainLib = libs[0];
  }

  public readonly pageKey: string;

  public readonly containerName: string;

  public readonly libNames: string[];

  public readonly mainLib: string;

  public readonly debugPorts: number[];

  public layoutMode: LayoutMode = LayoutMode.STREAM;

  public pageMode: PageMode = PageMode.MULTI;

  @computed
  public get isSinglePageMode() {
    return this.pageMode === PageMode.SINGLE;
  }

  @observable
  public iframeStyleMap: { [name: string]: string } = {};

  @action
  public setIframeStyle = (name: string, style: string) => {
    this.iframeStyleMap[name] = style;
  };

  @observable
  public globalProps: object = {};

  @action
  public setGlobalProps = (data: object) => {
    this.globalProps = data;
  };

  @observable
  public metaInfo: GlobalMeta = {
    title: 'vize page',
    desc: '',
    duration: null,
    expiredJump: '',
  };

  @observable
  public globalStyle: GlobalStyle = defaultPageStyle;

  @action
  public setGlobalStyle = (data: GlobalStyle) => {
    this.globalStyle = data;
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

  @observable
  public previewMode = false;

  @action
  public togglePreviewMode = () => {
    this.previewMode = !this.previewMode;
  };
}

export const globalStore = new GlobalStore();

if (isDev()) {
  setTimeout(() => injectGlobalReadonlyGetter('vize_global_store', () => toJS(globalStore)), 1000);
}
