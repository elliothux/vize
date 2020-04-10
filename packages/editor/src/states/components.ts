import { action, computed, observable } from "mobx";
import { ComponentInstance, Maybe } from "types";
import { pagesStore } from "./pages";

export class ComponentsStore {
    @observable
    private pagesComponentInstancesMap: {
        [key: number]: ComponentInstance[];
    } = {};

    @computed
    public get componentInstances(): ComponentInstance[] {
        return this.pagesComponentInstancesMap[pagesStore.currentPage.key];
    }

    @action
    public addComponentInstancesMap = (pageKey: number) => {
        this.pagesComponentInstancesMap[pageKey] = [];
    };

    @action
    public deleteComponentInstancesMap = (pageKey: number) => {
        delete this.pagesComponentInstancesMap[pageKey];
    };
}

export const componentsStore = new ComponentsStore();
