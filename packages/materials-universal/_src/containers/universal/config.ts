const info = {
  name: '通用页面容器',
  desc: '通用页面容器',
  author: 'Copyes@github',
};

const globalDataForm = {
  shareTitle: {
    title: '全局分享文字',
    default: '22',
    type: 'string',
  },
};

const pageDataForm = {
  shareTitle: {
    title: '页面分享文字',
    default: '33',
    type: 'string',
  },
};

const globalStyleForm = {
  backgroundColor: {
    title: '全局背景色',
    default: 'rgba(255, 255, 255, 0)',
    type: 'string',
    'x-component': 'Color',
  },
};

const pageStyleForm = {
  backgroundColor: {
    title: '页面背景色',
    default: 'rgba(255, 255, 255, 0)',
    type: 'string',
    'x-component': 'Color',
  },
};

export default {
  info,
  globalDataForm,
  pageDataForm,
  globalStyleForm,
  pageStyleForm,
  globalEmitEvents: [{ displayName: 'global emit测试', eventName: 'test' }],
  globalOnEvents: [{ displayName: 'global on测试', eventName: 'test' }],
  pageEmitEvents: [{ displayName: 'page emit测试', eventName: 'test' }],
  pageOnEvents: [{ displayName: 'page on测试', eventName: 'test' }],
};
