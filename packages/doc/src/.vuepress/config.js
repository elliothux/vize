module.exports = {
  title: 'Vize',
  description: 'Vize: 现代化的可视化搭建引擎',
  repo: 'https://github.com/vize-team/vize',
  serviceWorker: true,
  displayAllHeaders: true,
  // dest: path.resolve(__dirname, '../../public/docs'),
  // base: '/docs/',
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: 'https://raw.githubusercontent.com/vize-team/vize/doc/dev-doc/packages/editor/public/favicon.ico',
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
    sidebar: [
      {
        title: '欢迎',
        collapsable: true,
        children: ['/welcome/intro', '/welcome/packages'],
      },
      {
        title: '快速上手',
        collapsable: true,
        children: ['/start/ready', '/start/component', '/start/plugin', '/start/action', '/start/container'],
      },
      {
        title: '物料开发',
        collapsable: true,
        children: ['/dev/materials', '/dev/component', '/dev/plugin', '/dev/action', '/dev/container'],
      },
      {
        title: '事件系统',
        collapsable: true,
        children: ['/events/intro', '/events/component', '/events/plugin', '/events/container', 'events/async'],
      },
      {
        title: '表单',
        collapsable: true,
        children: ['/form/intro', '/form/jsonSchema', '/form/registryField', '/form/dynamicForm'],
      },
      {
        title: '样式',
        collapsable: true,
        children: ['/style/styleGroup', '/style/styleInject', '/style/fixed'],
      },
      {
        title: '进阶',
        collapsable: true,
        children: [
          '/advanced/meta',
          '/advanced/containerComponent',
          '/advanced/routerController.md',
          '/advanced/hot-area-component.md',
          '/advanced/dsl.md',
        ],
      },
      {
        title: '部署',
        collapsable: true,
        children: [
          '/deploy/intro',
          '/deploy/user',
          '/deploy/generator',
          '/deploy/publisher',
          '/deploy/resources',
          '/deploy/middleware',
        ],
      },
      {
        title: 'CLI',
        collapsable: true,
      },
    ],
  },
  plugins: [
    'dehydrate',
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/plugin-nprogress',
    '@vuepress/plugin-pwa',
    '@vuepress/last-updated',
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
