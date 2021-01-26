import * as WebSocket from 'ws';
import watch from 'node-watch';
import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getLibPaths, LibPaths, log, logWithSpinner, stopSpinner } from '../utils';
import { LibConfig } from '../config';
import { getLibWebpackConfig } from '../webpackCompiler';
import { generateFormEntryFile, generateMaterialsEntryFile } from './autoRequire';
import { clearTemp, generateMaterialsManifest, openEditor, prepareEditor, webpackCallback } from './utils';

interface Options {
  libPaths: LibPaths;
  libConfig: LibConfig;
  idProd: boolean;
  open?: boolean;
  port?: number;
  registry?: string;
}

enum RecompileCallbackCommand {
  CONNECTED = 'connected',
  RECOMPILE = 'recompile',
  RELOAD = 'reload',
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

  private libPaths: LibPaths;

  private readonly libConfig: LibConfig;

  private readonly isProd: boolean;

  private readonly open: boolean;

  private readonly registry?: string;

  private readonly port: number;

  private withForms: boolean;

  private recompileCallback: Maybe<(command: RecompileCallbackCommand) => void> = null;

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

  private runHotReloadServer = (port: number) => {
    const wss = new WebSocket.Server({ port, path: '/__vize-materials-hot-reload-dev-server' });
    wss.on('connection', ws => {
      ws.send(RecompileCallbackCommand.CONNECTED);

      this.recompileCallback = (command: RecompileCallbackCommand) => {
        log(`🔥  重新加载物料库`);
        ws.send(command);
      };
    });
  };

  private runWatchServer = () => {
    logWithSpinner('🤖', '启动 File Watcher');
    const { components, plugins, actions, containers, formFields, formRules } = this.libPaths;
    [components, plugins, actions, containers, formFields, formRules].forEach((path: string) => {
      watch(path, { recursive: false }, () => {
        log(`🔥  ${path} 目录更新`);
        return this.afterUpdate();
      });
    });
    stopSpinner();
  };

  private afterUpdate = async () => {
    const { root, containerName } = this.libPaths;
    this.libPaths = getLibPaths(root, containerName);

    logWithSpinner('🔥', '重新执行前置脚本');
    await this.prepareFiles();
    stopSpinner();
  };

  public dev = async () => {
    const [editorStaticPath] = await Promise.all([prepareEditor(this.registry), this.prepareFiles()]);
    const config = this.generateWebpackConfig(false);
    const compiler = webpack(config);

    compiler.hooks.beforeCompile.tap('BeforeMaterialsCompile', () => {
      console.log('BeforeMaterialsCompile', this.recompileCallback);
      this.recompileCallback?.(RecompileCallbackCommand.RECOMPILE);
    });

    compiler.hooks.emit.tap('EmitMaterialsCompile', () => {
      console.log('EmitMaterialsCompile', this.recompileCallback);
      this.recompileCallback?.(RecompileCallbackCommand.RELOAD);
    });

    compiler.hooks.done.tap('DoneMaterialsCompile', () => {
      stopSpinner();
    });

    new WebpackDevServer(compiler, {
      hot: true,
      inline: false,
      compress: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      contentBase: [editorStaticPath],
      before: () => {
        this.runWatchServer();
        this.runHotReloadServer(this.port + 1);
      },
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

    logWithSpinner('🚀', ' 运行 Webpack 构建');
    await new Promise((resolve, reject) => webpack(config).run(webpackCallback(resolve, reject)));

    logWithSpinner('🚀', ' 生成 meta 文件');
    await generateMaterialsManifest(this.libConfig.libName, this.libPaths.dist);

    logWithSpinner('✨', ' 完成');
    stopSpinner();
    return;
  };
}
