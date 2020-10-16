import webpack from 'webpack';
import { Stats } from 'webpack';
import { generateWebpackConfig } from './configGenerator';

export function runBuild(root: string) {
  const config = generateWebpackConfig(root);
  return new Promise((resolve, reject) => webpack(config).run(webpackCallback(resolve, reject)));
}

function webpackCallback(resolve: Function, reject: Function) {
  return (err: Error, stats: Stats) => {
    if (err) {
      console.error('fatal webpack errors:', (err.stack.toString() || err.toString()).trim());
      if ((err as any).details) {
        console.error('fatal webpack errors:', (err as any).details.trim());
      }
      reject();
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
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
