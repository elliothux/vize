import * as fs from 'fs-extra';
import * as path from 'path';
import { error, LibPaths, logWithSpinner, stopSpinner } from '../utils';
import { LibConfig } from '../config';
import webpack, { Configuration, Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getLibWebpackConfig } from '../webpackCompiler';
import { generateFormEntryFile, generateMaterialsEntryFile } from './autoRequire';

interface Options {
  libPaths: LibPaths;
  libConfig: LibConfig;
  idProd: boolean;
  port?: number;
}

export class Builder {
  constructor({ libConfig, libPaths, idProd, port = 4567 }: Options) {
    this.libPaths = libPaths;
    this.libConfig = libConfig;
    this.isProd = idProd;
    this.port = port;
  }

  private readonly libPaths: LibPaths;

  private readonly libConfig: LibConfig;

  private readonly isProd: boolean;

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

  private clearTemp = async () => {
    logWithSpinner('💭', '清除缓存');

    const { temp, output } = this.libPaths;
    if (!(await fs.existsSync(temp))) {
      await fs.mkdir(temp);
    }

    const files = await fs.readdir(temp);
    await Promise.all([
      ...files.map(file => {
        if (Builder.TEMP_CLEAR_IGNORE.includes(file)) {
          return Promise.resolve();
        }
        return fs.remove(path.join(temp, file));
      }),
      fs.emptyDir(output),
    ]);

    stopSpinner();
  };

  private prepareFiles = async () => {
    await this.clearTemp();
    this.withForms = await generateFormEntryFile(this.libPaths);
    await generateMaterialsEntryFile(this.libPaths, this.libConfig, this.withForms, this.isProd);
  };

  public dev = async () => {
    await this.prepareFiles();

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
      // contentBase: [this.libConfig.editorStaticPath, this.paths.outputPath],
      // after: () => {
      //   if (this.editorDownloadSuccess) {
      //     return this.openEditor();
      //   }
      //   return (this.editorDownloadCallback = this.openEditor);
      // },
      // before: app => {
      //   this.runHotReloadServer(1 + this.port);
      //
      //   app.post('/cgi/preview', bodyParser.json(), (req, res) =>
      //       preview(req, res, this.paths, this.container!.pathName)
      //   );
      // },
    }).listen(this.port);
  };

  public dist = async () => {
    await this.prepareFiles();
    const config = this.generateWebpackConfig(true);

    logWithSpinner('🚀', '运行 Webpack 构建');
    await new Promise((resolve, reject) => webpack(config).run(Builder.webpackCallback(resolve, reject)));
    logWithSpinner('✨', ' 构建完成');
    stopSpinner();
    return;
  };

  static webpackCallback = (resolve: Function, reject: Function) => {
    return (err: Error, stats: Stats) => {
      if (err) {
        error('fatal webpack errors:', (err.stack.toString() || err.toString()).trim());
        if ((err as any).details) {
          error('fatal webpack errors:', (err as any).details.trim());
        }
        reject();
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        info.errors.forEach((e: string) => {
          if (e.trim()) {
            error('\n\nWebpack compilation errors:', e.trim());
          }
        });
        return reject();
      }
      return resolve();
    };
  };

  static TEMP_CLEAR_IGNORE = ['editor'];
}
