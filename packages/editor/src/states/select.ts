import { action, observable, toJS } from 'mobx';
import { getComponentSelectedCallback } from 'runtime';
import { Maybe } from 'types';
import { injectGlobalReadonlyGetter, isDev } from 'utils';

export enum SelectType {
  GLOBAL = 'global',
  PAGE = 'page',
  COMPONENT = 'component',
  PLUGIN = 'plugin',
  HOTAREA = 'hotarea',
}

export class SelectStore {
  @observable
  public selectType: SelectType = SelectType.GLOBAL;

  @action
  public selectGlobal = () => {
    this.selectType = SelectType.GLOBAL;
  };
  /**
   * @desc select page
   */
  @observable
  public pageIndex = 0;

  @action
  public selectPage = (index: number) => {
    this.selectType = SelectType.PAGE;
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

  @action
  private setComponentKey = (key: number, asHotAreaContainer?: boolean) => {
    if (key === this.componentKey) {
      getComponentSelectedCallback(key)?.({ selected: true, asHotAreaContainer });
      return;
    }

    getComponentSelectedCallback(this.componentKey)?.({ selected: false });
    getComponentSelectedCallback(key)?.({ selected: true, asHotAreaContainer });

    this.componentKey = key;
  };

  @action
  public selectComponent = (shared: boolean, key: number, parentKey?: number) => {
    this.sharedComponentSelected = shared;
    this.selectType = SelectType.COMPONENT;
    this.setComponentKey(key);
    this.setContainerComponentKey(parentKey || -1);
    this.hotAreaIndex = -1;
  };

  @observable
  public containerComponentKey = -1;

  @action
  private setContainerComponentKey = (key: number) => {
    if (key === this.containerComponentKey) {
      getComponentSelectedCallback(key)?.({ selected: true, asContainer: true });
      return;
    }

    getComponentSelectedCallback(this.containerComponentKey)?.({ selected: false });
    getComponentSelectedCallback(key)?.({ selected: true, asContainer: true });

    this.containerComponentKey = key;
  };

  @action
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

  @action
  public selectHotArea = (index: number, componentKey: number) => {
    this.setComponentKey(componentKey, true);
    this.hotAreaIndex = index;
    this.setContainerComponentKey(-1);
    this.selectType = SelectType.HOTAREA;
  };

  /**
   * @desc select plugin
   */
  @observable
  public pluginKey = -1;

  @action
  public selectPlugin = (key: number) => {
    this.selectType = SelectType.PLUGIN;
    this.pluginKey = key;
    this.setContainerComponentKey(-1);
  };

  @action
  public isCurrentPlugin = (key: number) => {
    return this.selectType === SelectType.PLUGIN && this.pluginKey === key;
  };

  /**
   * @desc selectMode
   */
  @observable
  public selectMode = false;

  @action
  public setSelectMode = (mode: boolean) => {
    this.selectMode = mode;
    this.selectModeSelectedComponent = null;
  };

  @observable
  public selectModeSelectedComponent: Maybe<{ parentKey?: number; key?: number }> = null;

  @action
  public setSelectModeSelectComponent = (selectedComponent: SelectStore['selectModeSelectedComponent']) => {
    this.selectModeSelectedComponent = selectedComponent;
  };
}

export const selectStore = new SelectStore();

if (isDev()) {
  setTimeout(() => injectGlobalReadonlyGetter('vize_select_store', () => toJS(selectStore)), 1000);
}
