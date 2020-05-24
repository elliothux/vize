// import { observable } from "mobx";
import { getQueryParams } from "../utils";

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
}

export const globalStore = new GlobalStore();
