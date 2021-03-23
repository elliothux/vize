const info = {
  name: '通用页面容器',
  desc: '通用页面容器',
  author: 'Copyes@github',
};

const dataForm = {
  shareTitle: {
    title: '分享文字',
    default: '',
    type: 'string',
  },
};

const styleForm = {
  backgroundColor: {
    title: '全局背景色',
    default: 'rgba(255, 255, 255, 0)',
    type: 'color',
  },
};

export default {
  info,
  dataForm,
  styleForm,
  emitEvents: [{ displayName: 'emit测试', eventName: 'test' }],
  onEvents: [{ displayName: 'on测试', eventName: 'test' }],
};
