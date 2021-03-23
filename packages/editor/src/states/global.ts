import { action, observable, toJS } from 'mobx';
import { injectGlobalReadonlyGetter, isDev } from 'utils';
import { EventInstance, GlobalMeta, Maybe } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
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

  @observable
  public containerEvents: EventInstance[] = [];

  @action
  public setContainerEvents = (setter: (eventInstances: EventInstance[]) => EventInstance[] | void) => {
    const events = setter(this.containerEvents);
    if (events) {
      this.containerEvents = events;
    }
    return events;
  };

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
