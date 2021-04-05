const sidebar = [
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
];

module.exports = {
  sidebar,
};
