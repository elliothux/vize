const info = {
  name: '按钮',
  desc: '基础按钮',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '按钮文字',
    default: '按钮',
    type: 'string',
  },
};

export default {
  info,
  dataForm,
  emitEvents: [{ displayName: 'emit测试', eventName: 'test' }],
  onEvents: [{ displayName: 'on测试', eventName: 'test' }],
};
