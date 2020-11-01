export interface LibPaths {
  libPaths: string[];
}

export type MaterialsPathMap = {
  [lib: string]: {
    [identityName: string]: string;
  };
};

export type PageMaterialsPathMap = MaterialsPathMap[];
