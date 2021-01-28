export interface LibPaths {
  libPaths: string[];
}

export type MaterialsPathMap = {
  [lib: string]: {
    [identityName: string]: {
      path: string;
      name: string;
    };
  };
};

export type PageMaterialsPathMap = MaterialsPathMap[];
