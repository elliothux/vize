export interface PageTplParams {
  globalFilePath: string;
  componentVars: string;
  componentImports: string;
  componentInstances: string;
  actionVars: string;
  actionImports: string;
}

export interface GlobalTplParams {
  globalStyle: string;
  autoInjectedStyle: string;
  meta: string;
  global: string;
  actionImports: string;
  actionVars: string;
  pluginImports: string;
  pluginVars: string;
  pluginInstances: string;
}
