import { action, observable } from 'mobx';

export enum SelectType {
  PAGE,
  COMPONENT,
  PLUGIN,
  HOTAREA,
}

export class SelectStore {
  @observable
  public selectType: SelectType = SelectType.PAGE;

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
    return this.selectType === SelectType.PAGE && this.pageIndex === index;
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
  public selectHotArea = (index: number, componentKey?: null) => {
    if (componentKey) {
      this.componentKey = componentKey;
    }
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
}

export const selectStore = new SelectStore();
