import { action, observable } from "mobx";

export enum SelectType {
  PAGE,
  COMPONENT,
  PLUGIN
}

export class SelectStore {
  @observable
  public selectType: SelectType = SelectType.PAGE;

  @observable
  public pageIndex: number = 0;

  @action
  public selectPage = (index: number) => {
    this.selectType = SelectType.PAGE;
    this.pageIndex = index;
  };

  public isCurrentPage = (index: number) => {
    return this.selectType === SelectType.PAGE && this.pageIndex === index;
  };

  @observable
  public componentKey: number = -1;

  @action
  public selectComponent = (key: number) => {
    this.selectType = SelectType.COMPONENT;
    this.componentKey = key;
  };

  public isCurrentComponent = (key: number) => {
    return (
      this.selectType === SelectType.COMPONENT && this.componentKey === key
    );
  };

  @observable
  public pluginIndex: number = -1;

  @action
  public selectPlugin = (index: number) => {
    this.selectType = SelectType.PLUGIN;
    this.pluginIndex = index;
  };

  @action
  public isCurrentPlugin = (index: number) => {
    return this.selectType === SelectType.PLUGIN && this.pluginIndex === index;
  };
}

export const selectStore = new SelectStore();
