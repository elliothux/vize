const info = {
  name: 'Alert 弹窗',
  desc: 'alert',
  author: 'aedron@github',
};

const dataForm = {
  title: {
    title: '弹窗标题',
    type: 'string',
    default: '提示',
    required: true,
  },
  text: {
    title: '弹窗内容',
    type: 'string',
    default: '提示消息',
    required: true,
  },
  url: {
    title: '确认跳转链接',
    type: 'string',
    'x-rules': 'url',
  },
};

export default {
  info,
  dataForm,
  maxTimeout: 'infinity',
};
