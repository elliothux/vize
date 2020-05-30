import { action, observable } from 'mobx';
import { getCurrentPageComponentIndex } from '../utils';
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

    @action
    public selectComponentByIndex = (index: number) => {
        this.selectType = SelectType.COMPONENT;
        this.componentKey = componentsStore.componentInstances[index]!.key;
    };

    public isCurrentComponent = (key: number) => {
        return this.selectType === SelectType.COMPONENT && this.componentKey === key;
    };

    @observable
    public pluginIndex = -1;

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
