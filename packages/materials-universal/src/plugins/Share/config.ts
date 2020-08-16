const info = {
  name: '分享配置',
  desc: '基础分享配置',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '分享文字',
    default: 'share',
    type: 'string',
  },
};

export default {
  info,
  dataForm,
  emitEvents: [{ displayName: '测试', eventName: 'test' }],
  onEvents: [{ displayName: '测试', eventName: 'test' }],
};
