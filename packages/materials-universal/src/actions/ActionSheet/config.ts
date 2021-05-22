const info = {
  name: '动作面板',
  desc: '从底部弹出的模态框，提供2个以上的操作动作',
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
  actions: {
    title: '动作项',
    type: 'array',
    items: {
      title: '动作',
      type: 'object',
      properties: {
        text: {
          title: '文本',
          type: 'string',
          default: '动作文本',
          required: true,
        },
        url: {
          title: '跳转URL',
          type: 'string',
          default: '',
          format: 'url',
        },
      },
    },
  },
};

export default {
  info,
  dataForm,
  maxTimeout: 'infinity',
};
