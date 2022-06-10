import { action, observable, toJS } from 'mobx';
import { getComponentSelectedCallback } from '@vize/runtime-web';
import { PageUniversalEventTrigger } from '@vize/types';
import { Maybe } from '@vize/types';
import { injectGlobalReadonlyGetter, isDev } from 'utils';
import { withTimeTravel } from 'mobx-time-traveler';
import { EventEmitTypes, events } from '../libs';
import { AttrEditTab } from '../components/AttributesEditor';
import { pagesStore } from './pages';
import { componentsStore } from './components';

export enum SelectType {
  GLOBAL = 'global',
  PAGE = 'page',
  COMPONENT = 'component',
  PLUGIN = 'plugin',
  HOTAREA = 'hotarea',
}

@withTimeTravel
export class SelectStore {
  @observable
  public selectType: SelectType = SelectType.GLOBAL;

  @action.bound
  public selectGlobal = () => {
    this.selectType = SelectType.GLOBAL;
  };
  /**
   * @desc select page
   */
  @observable
  public pageIndex = 0;

  @action.bound
  public selectPage = (index: number) => {
    this.selectType = SelectType.PAGE;
    if (index === this.pageIndex) {
      return;
    }

    setTimeout(async () => {
      await pagesStore.executePageEventCallbacks(this.pageIndex, PageUniversalEventTrigger.BEFORE_LEAVE_PAGE);
      return pagesStore.executePageEventCallbacks(index, PageUniversalEventTrigger.AFTER_ENTER_PAGE);
    }, 0);
    this.pageIndex = index;
  };

  public isCurrentPage = (index: number) => {
    return this.selectType === SelectType.GLOBAL && this.pageIndex === index;
  };

  /**
   * @desc select component
   */
  @observable
  public componentKey = -1;

  @observable
  public sharedComponentSelected = false;

  @action.bound
  private setComponentKey = (key: number, asHotAreaContainer?: boolean, ignorePrevCallback?: boolean) => {
    if (key === this.componentKey) {
      getComponentSelectedCallback(key)?.({ selected: true, asHotAreaContainer });
      return;
    }

    if (!ignorePrevCallback) {
      getComponentSelectedCallback(this.componentKey)?.({ selected: false });
    }
    getComponentSelectedCallback(key)?.({ selected: true, asHotAreaContainer });

    this.componentKey = key;
  };

  @action.bound
  public selectComponent = (shared: boolean, key: number, parentKey?: number) => {
    this.sharedComponentSelected = shared;
    this.selectType = SelectType.COMPONENT;

    this.setContainerComponentKey(parentKey || -1);
    this.setComponentKey(key, false, this.componentKey === parentKey);
    this.hotAreaIndex = -1;
  };

  @observable
  public containerComponentKey = -1;

  @action.bound
  private setContainerComponentKey = (key: number, asHotAreaParentContainer?: boolean) => {
    if (key === this.containerComponentKey) {
      getComponentSelectedCallback(key)?.({ selected: true, asContainer: true, asHotAreaParentContainer });
      return;
    }

    getComponentSelectedCallback(this.containerComponentKey)?.({ selected: false });
    getComponentSelectedCallback(key)?.({ selected: true, asContainer: true, asHotAreaParentContainer });

    this.containerComponentKey = key;
  };

  @action.bound
  public selectContainerComponent = (key: number) => {
    this.selectType = SelectType.COMPONENT;
    this.setContainerComponentKey(key);
  };

  public isCurrentComponent = (key: number) => {
    return this.selectType === SelectType.COMPONENT && this.componentKey === key;
  };

  /**
   * @desc select hot-area
   */
  @observable
  public hotAreaIndex = -1;

  @action.bound
  public selectHotArea = (index: number, componentKey: number) => {
    const { parent } = componentsStore.getCurrentPageComponentInstance(componentKey);
    const parentKey = parent ? parent.key : -1;

    this.setContainerComponentKey(parentKey);
    this.setComponentKey(componentKey, true, this.componentKey === parentKey);

    this.hotAreaIndex = index;
    this.selectType = SelectType.HOTAREA;

    events.emit(EventEmitTypes.JUMP_ATTR_EDIT_TAB, AttrEditTab.EVENTS);
  };

  /**
   * @desc select plugin
   */
  @observable
  public pluginKey = -1;

  @action.bound
  public selectPlugin = (key: number) => {
    this.selectType = SelectType.PLUGIN;
    this.pluginKey = key;
    this.setContainerComponentKey(-1);
  };

  @action.bound
  public isCurrentPlugin = (key: number) => {
    return this.selectType === SelectType.PLUGIN && this.pluginKey === key;
  };

  /**
   * @desc selectMode
   */
  @observable
  public selectMode = false;

  @action.bound
  public setSelectMode = (mode: boolean) => {
    const { containerComponentKey } = this;
    this.selectMode = mode;
    this.selectModeSelectedComponent = containerComponentKey > -1 ? { parentKey: containerComponentKey } : null;
  };

  @observable
  public selectModeSelectedComponent: Maybe<{ parentKey?: number; key?: number }> = null;

  @action.bound
  public setSelectModeSelectComponent = (selectedComponent: SelectStore['selectModeSelectedComponent']) => {
    this.selectModeSelectedComponent = selectedComponent;
  };
}

export const selectStore = new SelectStore();

if (isDev()) {
  setTimeout(() => injectGlobalReadonlyGetter('vize_select_store', () => toJS(selectStore)), 1000);
}
