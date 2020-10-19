import { action, observable } from 'mobx';
import { Maybe } from '../types';

export enum SelectType {
  GLOBAL,
  COMPONENT,
  PLUGIN,
  HOTAREA,
}

export class SelectStore {
  @observable
  public selectType: SelectType = SelectType.GLOBAL;

  /**
   * @desc select page
   */
  @observable
  public pageIndex = 0;

  @action
  public selectPage = (index: number) => {
    this.selectType = SelectType.GLOBAL;
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

  @action
  public selectComponent = (key: number) => {
    this.selectType = SelectType.COMPONENT;
    this.componentKey = key;
    this.hotAreaIndex = -1;
  };

  @observable
  public containerComponentKey = -1;

  @action
  public selectContainerComponent = (key: number) => {
    this.selectType = SelectType.COMPONENT;
    this.containerComponentKey = key;
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
    this.componentKey = componentKey;
    this.hotAreaIndex = index;
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
    if (mode) {
      this.selectModeSelectedComponent = null;
    }
  };

  @observable
  public selectModeSelectedComponent: Maybe<{ parentKey?: number; key?: number }> = null;

  @action
  public setSelectModeSelectComponent = (selectedComponent: SelectStore['selectModeSelectedComponent']) => {
    this.selectModeSelectedComponent = selectedComponent;
  };
}

export const selectStore = new SelectStore();
