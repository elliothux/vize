import { action, observable } from 'mobx';
import { getQueryParams } from '../utils';
import { LayoutMode, Maybe, PageMeta } from '../types';

export class GlobalStore {
  constructor() {
    const { libs, debugPorts } = getQueryParams();
    this.libNames = libs;
    this.mainLib = libs[0];
    this.debugPorts = debugPorts;
  }

  public libNames: string[];

  public mainLib: string;

  public debugPorts: number[];

  public layoutMode: LayoutMode = LayoutMode.STREAM;

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
  public metaInfo: PageMeta = {
    title: 'vize page',
    desc: '',
    duration: null,
    expiredJump: '',
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

  @observable
  public selectMode = false;

  @action
  public setSelectMode = (mode: boolean) => {
    this.selectMode = mode;
    if (mode) {
      this.selectModeSelectedComponent = null;
    }
  };

  @observable
  public selectModeSelectedComponent: Maybe<{ parentKey?: number; key?: number }> = null;

  @action
  public setSelectModeSelectComponent = (selectedComponent: GlobalStore['selectModeSelectedComponent']) => {
    this.selectModeSelectedComponent = selectedComponent;
  };
}

export const globalStore = new GlobalStore();
