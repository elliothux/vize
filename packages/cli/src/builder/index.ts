import { getLibPaths, LibPaths } from "../utils";


export class Builder {
  constructor(libPaths: LibPaths) {
    this.libPaths = libPaths;
  }

  private libPaths: LibPaths;

  public dev = () => {

  }
}
