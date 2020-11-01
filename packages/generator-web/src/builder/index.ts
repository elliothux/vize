import webpack from 'webpack';
import { MultiCompiler, Stats } from 'webpack';
import { BuildConfigParams, generateWebpackConfig } from './configGenerator';
import { SecondParameter } from '../../types/helper';

export function runBuild(params: BuildConfigParams) {
  const config = generateWebpackConfig(params);
  return new Promise((resolve, reject) => webpack(config).run(webpackCallback(resolve, reject)));
}

function webpackCallback(resolve: Function, reject: Function) {
  return (err: Error, stats: SecondParameter<MultiCompiler['run']>) => {
    if (err) {
      console.error('fatal webpack errors:', (err.stack.toString() || err.toString()).trim());
      if ((err as any).details) {
        console.error('fatal webpack errors:', (err as any).details.trim());
      }
      reject();
    }

    const info = (stats as Stats).toJson();
    if ((stats as Stats).hasErrors()) {
      info.errors.forEach((e: string) => {
        if (e.trim()) {
          console.error('\n\nWebpack compilation errors:', e.trim());
        }
      });
      return reject();
    }
    return resolve();
  };
}
