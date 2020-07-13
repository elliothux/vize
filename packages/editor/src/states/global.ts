import { action, observable } from 'mobx';
import { getQueryParams } from '../utils';
import { LayoutMode } from '../types';

export class GlobalStore {
    constructor() {
        const { libs, debugPorts } = getQueryParams();
        this.libNames = libs;
        this.mainLib = libs[0];
        this.debugPorts = debugPorts;
    }

    libNames: string[];

    mainLib: string;

    debugPorts: number[];

    layoutMode: LayoutMode = LayoutMode.STREAM;

    @observable
    iframeStyleMap: { [name: string]: string } = {};

    @action
    setIframeStyle = (name: string, style: string) => {
        this.iframeStyleMap[name] = style;
    };
}

export const globalStore = new GlobalStore();
