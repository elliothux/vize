const info = {
  name: '页面宽度限制',
  desc: '设置页面最大宽度，让移动端页面快速适配 PC',
  author: 'Aedron@github',
};

const dataForm = {
  maxWidth: {
    title: '页面最大宽度',
    default: 800,
    type: 'number',
    required: true,
    description: '超过最大宽度时，页面居中两边留白',
  },
};

export default {
  info,
  dataForm,
  singleInstance: true,
};
