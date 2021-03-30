import { action, computed, observable, toJS } from 'mobx';
import { getQueryParams, injectGlobalReadonlyGetter, isDev } from 'utils';
import { EventInstance, GlobalMeta } from 'types';
import { StoreWithUtils } from './utils';
import { editStore } from './edit';
import { pagesStore } from './pages';

interface GlobalState {
  metaInfo: GlobalMeta;
  globalProps: object;
  globalStyle: object;
  containerEvents: EventInstance[];
}

export class GlobalStore extends StoreWithUtils<GlobalStore> {
  constructor() {
    super();
    const { id, key } = getQueryParams();
    this.setMetaInfo({ id, key });
  }
  /**
   * @desc PageContainerEventsMap
   * @struct Map<Page, GlobalState>
   */
  @observable
  private pagesGlobalStateMap: { [key: number]: GlobalState } = {};

  @observable
  private singlePageGlobalState: GlobalState = {
    metaInfo: {
      title: 'vize page',
      desc: '',
      id: null,
      key: '',
      isTemplate: false,
      isEditor: true,
    },
    globalProps: {},
    globalStyle: {},
    containerEvents: [],
  };

  @computed
  public get globalState(): GlobalState {
    if (editStore.isSinglePageMode) {
      return this.singlePageGlobalState;
    }
    return this.pagesGlobalStateMap[pagesStore.currentPage.key];
  }

  @action
  private setCurrentPageGlobalState = (setter: (globalState: GlobalState) => GlobalState | void) => {
    if (editStore.isSinglePageMode) {
      const newState = setter(this.singlePageGlobalState);
      if (newState) {
        this.singlePageGlobalState = newState;
      }
      return;
    }

    const state = this.pagesGlobalStateMap[pagesStore.currentPage.key];
    const newState = setter(state);
    if (newState) {
      this.pagesGlobalStateMap[pagesStore.currentPage.key] = newState;
    }
  };

  /**
   * @desc GlobalData & GlobalStyle
   * @struct object
   */
  @computed
  public get globalData(): object {
    return this.globalState.globalProps!;
  }

  public setGlobalData = (data: object) => {
    return this.setCurrentPageGlobalState(state => {
      state.globalProps = data;
    });
  };

  @computed
  public get globalStyle(): object {
    return this.globalState.globalStyle;
  }

  public setGlobalStyle = (data: object) => {
    return this.setCurrentPageGlobalState(state => {
      state.globalStyle = data;
    });
  };

  /**
   * @desc GlobalMeta
   */
  @computed
  public get metaInfo(): GlobalMeta {
    return this.globalState.metaInfo;
  }

  public setMetaInfo = (data: Partial<GlobalMeta>) => {
    return this.setCurrentPageGlobalState(state => {
      state.metaInfo = {
        ...state.metaInfo,
        ...data,
      };
    });
  };
}

export const globalStore = new GlobalStore();

if (isDev()) {
  setTimeout(() => injectGlobalReadonlyGetter('vize_global_store', () => toJS(globalStore)), 1000);
}
