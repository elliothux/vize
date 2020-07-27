import { action, observable } from 'mobx';
import { componentsStore } from './components';

export enum SelectType {
    PAGE,
    COMPONENT,
    PLUGIN,
}

export class SelectStore {
    @observable
    public selectType: SelectType = SelectType.PAGE;

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

    @observable
    public componentKey = -1;

    @action
    public selectComponent = (key: number) => {
        this.selectType = SelectType.COMPONENT;
        this.componentKey = key;
    };

    // @action
    // public selectComponentByIndex = (index: number) => {
    //     this.selectType = SelectType.COMPONENT;
    //     const { key, parent } = componentsStore.componentInstances[index]!;
    //     this.selectComponent(key, parent!.key);
    // };

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
