export type SecondParameter<T extends (...args: any[]) => any> = T extends (
  firstArg: any,
  secondArg: infer P,
  ...args: any[]
) => any
  ? P
  : never;

export interface GeneratorPaths {
  libsPath: string;
  pagePath: string;
  srcPath: string;
  distPath: string;
  previewPath: string;
  containerPath: string;
  globalPath: string;
  pagesPath: string;
}
