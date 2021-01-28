const info = {
  name: 'Toast 提示',
  desc: 'toast 消息提示',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '内容',
    default: '提示消息',
    type: 'string',
    required: true,
  },
  duration: {
    title: '时长',
    type: 'number',
    default: 2,
    required: true,
  },
};

export default {
  info,
  dataForm,
  maxTimeout: 'infinity',
};
