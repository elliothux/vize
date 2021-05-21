const info = {
  name: '消息提醒（Toast）',
  desc: '通用消息提醒',
  author: 'Aedron@github',
};

const dataForm = {
  text: {
    title: '内容',
    default: '提示消息',
    type: 'string',
    required: true,
  },
  duration: {
    title: '展示时长',
    type: 'number',
    default: 2,
    required: true,
  },
  type: {
    title: '类型',
    type: 'string',
    default: 'info',
    enum: ['info', 'fail', 'success', 'loading'],
    enumNames: ['通用信息', '失败', '成功', '加载中'],
  },
};

export default {
  info,
  dataForm,
  maxTimeout: 'infinity',
};
