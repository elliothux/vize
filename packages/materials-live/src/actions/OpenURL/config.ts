const info = {
  name: '跳转URL',
  desc: '跳转链接',
  author: 'aedron@github',
};

const dataForm = {
  url: {
    title: 'H5 URL',
    type: 'string',
    required: true,
    'x-rules': 'url',
  },
  newTable: {
    title: '在新 Tab 中打开',
    type: 'boolean',
    default: false,
  },
};

export default {
  info,
  dataForm,
};
