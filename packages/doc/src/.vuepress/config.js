const { sidebar } = require('./sidebar');

module.exports = {
  title: 'Vize',
  description: 'Vize: 现代化的可视化搭建引擎',
  repo: 'https://github.com/vize-team/vize',
  serviceWorker: true,
  displayAllHeaders: true,
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: 'https://gw.alicdn.com/imgextra/i2/O1CN01UvNTMG1TWfGYzk7xX_!!6000000002390-73-tps-32-32.ico',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '文档',
        link: '/welcome/intro',
      },
      {
        text: 'Github',
        link: 'https://github.com/vize-team/vize',
      },
    ],
    sidebarDepth: 2,
    sidebar,
  },
  plugins: [
    'dehydrate',
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/plugin-nprogress',
    '@vuepress/last-updated',
    [
      '@vuepress/plugin-pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    [
      '@vuepress/plugin-medium-zoom',
      {
        selector: '.zoom',
        options: {
          margin: 16,
        },
      },
    ],
    'vuepress-plugin-smooth-scroll',
    'vuepress-plugin-table-of-contents',
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
      },
    ],
    [
      'code-switcher',
      {
        groups: {
          default: { config: 'config.ts', index: 'index.ts', style: 'index.scss' },
        },
      },
    ],
    ['vuepress-plugin-code-copy', true],
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-html5-embed'), {
        html5embed: {
          useImageSyntax: true,
          useLinkSyntax: false,
          attributes: {
            audio: 'width="320" controls class="audioplayer"',
            video: 'width="100%" height="auto" class="audioplayer" controls',
          },
        },
      });
    },
  },
};
