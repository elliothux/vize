// import { observable } from "mobx";
import { getQueryParams } from "../utils";

export class GlobalStore {
  constructor(libNames: string[], debugPorts: number[]) {
    this.libNames = libNames;
    this.debugPorts = debugPorts;
  }

  libNames: string[];

  debugPorts: number[];
}

const { libs, debugPorts } = getQueryParams();

export const globalStore = new GlobalStore(libs, debugPorts);
