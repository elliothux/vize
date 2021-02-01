export function getBabelConfig() {
  return {
    test: /\.(ts|tsx|js|jsx)$/,
    loader: 'babel-loader',
    options: {
      compact: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '58',
              ios: '9',
              android: '4.2',
            },
          },
        ],
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
      plugins: [
        [
          'transform-rename-import',
          {
            replacements: [{ original: 'rax', replacement: 'react' }],
          },
        ],
        'react-require',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        // ['@babel/plugin-transform-runtime', { regenerator: true }],
      ],
    },
  };
}

export function getSWConfig() {
  return {
    test: /\.(ts|tsx|js|jsx)$/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            jsx: true,
            dynamicImport: false,
            privateMethod: true,
            functionBind: false,
            exportDefaultFrom: true,
            exportNamespaceFrom: true,
            decorators: true,
            decoratorsBeforeExport: false,
            topLevelAwait: false,
            importMeta: false,
          },
        },
      },
    },
  };
}
