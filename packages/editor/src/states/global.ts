import { action, observable } from 'mobx';
import { getFormDefaultValue, getQueryParams } from 'utils';
import { getMaterialsContainerMeta } from 'libs';
import { EventInstance, GlobalMeta } from 'types';
import { StoreWithUtils } from './utils';

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { id, key } = getQueryParams();
    this.metaInfo.id = id;
    this.metaInfo.key = key;
  }

  @action
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

  @action
  public setGlobalData = (data: object) => (this.globalData = data);

  @observable
  public globalStyle: object = {};

  @action
  public setGlobalStyle = (data: object) => (this.globalStyle = data);

  /**
   * @desc Global Events
   */
  @observable
  public globalEvents: EventInstance[] = [];

  @action
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

  public setMetaInfo = (data: Partial<GlobalMeta>) => (this.metaInfo = { ...this.metaInfo, ...data });
}

export const globalStore = new GlobalStore();
