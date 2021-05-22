const info = {
  name: '弹窗提示',
  desc: '通用弹窗提示组件（Alert）',
  author: 'Aedron@github',
};

const dataForm = {
  title: {
    title: '标题',
    type: 'string',
    default: '弹窗标题',
    required: true,
  },
  desc: {
    title: '描述内容',
    type: 'string',
    'x-component': 'TextArea',
    default: '',
  },
  okText: {
    title: '确认按钮文案',
    type: 'string',
    default: '确认',
    required: true,
  },
  cancelText: {
    title: '取消按钮文案',
    type: 'string',
    default: '取消',
  },
  jumpUrl: {
    title: '确认跳转链接',
    type: 'string',
    format: 'url',
  },
};

export default {
  info,
  dataForm,
  onEvents: [
    { displayName: '切换弹窗', eventName: 'toggle' },
    { displayName: '打开弹窗', eventName: 'open' },
    { displayName: '关闭弹窗', eventName: 'close' },
  ],
  emitEvents: [
    { displayName: '打开弹窗', eventName: 'open' },
    { displayName: '关闭弹窗', eventName: 'close' },
  ],
  hideEditMask: true,
};
