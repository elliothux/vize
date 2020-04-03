import { observable } from "mobx";
import { Maybe } from "types";
import { getQueryParams } from "../utils";

export class GlobalStore {
  constructor(libName: string, debugPort: Maybe<number>) {
    this.libName = libName;
    this.debugPort = debugPort;
    this.isDebug = !!debugPort;
  }

  libName: string;

  debugPort: Maybe<number>;

  isDebug: boolean = false;
}

const { lib, debugPort } = getQueryParams();

export const globalStore = new GlobalStore(lib, debugPort);
