import { Configuration } from 'webpack';

export function getLibProdWebpackConfig(config: Configuration): Configuration {
    const { plugins } = config.module.rules.find(i => i.loader === 'babel-loader')!.options as any;
    plugins.push(['transform-rename-import', { original: 'rax', replacement: 'react' }]);

    console.log(config);

    return config;
}
