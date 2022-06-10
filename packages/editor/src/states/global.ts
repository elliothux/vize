import { action, observable } from 'mobx';
import { getFormDefaultValue, getQueryParams } from 'utils';
import { actionWithSnapshot, withTimeTravel } from 'mobx-time-traveler';
import { getMaterialsContainerMeta } from 'libs';
import { EventInstance, GlobalMeta } from '@vize/types';
import { StoreWithUtils } from './utils';

@withTimeTravel
export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { id, key } = getQueryParams();
    this.metaInfo.id = id;
    this.metaInfo.key = key;
  }

  @action.bound
  public init = () => {
    const { globalDataForm, globalStyleForm } = getMaterialsContainerMeta()!;
    this.globalData = getFormDefaultValue(globalDataForm);
    this.globalStyle = getFormDefaultValue(globalStyleForm);
  };

  /**
   * @desc GlobalData & GlobalStyle
   * @struct object
   */
  @observable
  public globalData: object = {};

  @actionWithSnapshot
  public setGlobalData = (data: object) => (this.globalData = data);

  @observable
  public globalStyle: object = {};

  @actionWithSnapshot
  public setGlobalStyle = (data: object) => (this.globalStyle = data);

  /**
   * @desc Global Events
   */
  @observable
  public globalEvents: EventInstance[] = [];

  @actionWithSnapshot({ needReloadDeps: true })
  public setGlobalEvents = (setter: (events: EventInstance[]) => EventInstance[] | void) => {
    const newEvents = setter(this.globalEvents);
    if (newEvents) {
      this.globalEvents = newEvents;
    }
    return newEvents;
  };

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

  @actionWithSnapshot
  public setMetaInfo = (data: Partial<GlobalMeta>) => (this.metaInfo = { ...this.metaInfo, ...data });
}

export const globalStore = new GlobalStore();
