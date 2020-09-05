import { action, computed, observable } from 'mobx';
import { defaultPageStyle, getQueryParams } from 'utils';
import { GlobalMeta, GlobalStyle, LayoutMode, Maybe, PageMode } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { libs, debugPorts } = getQueryParams();
    this.libNames = libs;
    this.mainLib = libs[0];
    this.debugPorts = debugPorts;
  }

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
  public setPreviewMode = (mode: boolean) => {
    this.previewMode = mode;
  };
}

export const globalStore = new GlobalStore();
