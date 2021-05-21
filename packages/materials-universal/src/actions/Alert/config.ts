const info = {
  name: '弹窗提示（Alert）',
  desc: '通用弹窗提示',
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
    widget: 'textarea',
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
  maxTimeout: 'infinity',
};
