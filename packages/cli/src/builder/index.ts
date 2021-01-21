import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { LibPaths, logWithSpinner, stopSpinner } from '../utils';
import { LibConfig } from '../config';
import { getLibWebpackConfig } from '../webpackCompiler';
import { generateFormEntryFile, generateMaterialsEntryFile } from './autoRequire';
import { clearTemp, openEditor, prepareEditor, webpackCallback } from './utils';

interface Options {
  libPaths: LibPaths;
  libConfig: LibConfig;
  idProd: boolean;
  open?: boolean;
  port?: number;
  registry?: string;
}

export class Builder {
  constructor({ libConfig, libPaths, idProd, open, registry, port = 4568 }: Options) {
    this.libPaths = libPaths;
    this.libConfig = libConfig;
    this.isProd = idProd;
    this.open = open;
    this.registry = registry;
    this.port = port;
  }

  private readonly libPaths: LibPaths;

  private readonly libConfig: LibConfig;

  private readonly isProd: boolean;

  private readonly open: boolean;

  private readonly registry?: string;

  private readonly port: number;

  private withForms: boolean;

  private generateWebpackConfig = (isProd: boolean): Configuration => {
    return getLibWebpackConfig({
      libPaths: this.libPaths,
      libConfig: this.libConfig,
      isProd,
      useSWC: true,
      withForms: this.withForms,
    });
  };

  private prepareFiles = async () => {
    await clearTemp(this.libPaths);
    this.withForms = await generateFormEntryFile(this.libPaths);
    await generateMaterialsEntryFile(this.libPaths, this.libConfig, this.withForms, this.isProd);
  };

  public dev = async () => {
    const [editorStaticPath] = await Promise.all([prepareEditor(this.registry), this.prepareFiles()]);

    const config = this.generateWebpackConfig(false);
    const compiler = webpack(config);
    new WebpackDevServer(compiler, {
      hot: true,
      inline: false,
      compress: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      contentBase: [editorStaticPath],
      after: () => {
        openEditor({
          debugPorts: this.port.toString(),
          libs: this.libConfig.libName,
          container: this.libPaths.containerName,
        });
      },
    }).listen(this.port);
  };

  public dist = async () => {
    await this.prepareFiles();
    const config = this.generateWebpackConfig(true);

    logWithSpinner('🚀', '运行 Webpack 构建');
    await new Promise((resolve, reject) => webpack(config).run(webpackCallback(resolve, reject)));
    logWithSpinner('✨', ' 构建完成');
    stopSpinner();
    return;
  };
}
