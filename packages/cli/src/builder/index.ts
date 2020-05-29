import * as fs from 'fs-extra';
import * as path from 'path';
import { LibPaths, logWithSpinner, stopSpinner } from '../utils';
import { LibConfig } from '../config';
import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getLibWebpackConfig } from '../webpackCompiler';
import { generateEntryFile } from './autoRequire';

export class Builder {
    constructor(libPaths: LibPaths, libConfig: LibConfig) {
        this.libPaths = libPaths;
        this.libConfig = libConfig;
    }

    private readonly libPaths: LibPaths;

    private readonly libConfig: LibConfig;

    private generateWebpackConfig = (isProd: boolean): Configuration => {
        return getLibWebpackConfig(this.libPaths, this.libConfig, isProd);
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

    private generateEntryTempFiles = () => {
        return generateEntryFile(this.libPaths);
    };

    private prepareFiles = async () => {
        await this.clearTemp();
        await this.generateEntryTempFiles();
    };

    public dev = async (port = 4567) => {
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
        }).listen(port);
    };

    static TEMP_CLEAR_IGNORE = ['editor'];
}
