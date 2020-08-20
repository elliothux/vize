const info = {
  name: '图片',
  desc: '纯图片组件',
  author: 'aedron@github',
};

const dataForm = {
  src: {
    title: '图片',
    type: 'input',
    required: true,
    default: 'https://img.alicdn.com/tfs/TB1PibhR4D1gK0jSZFsXXbldVXa-512-416.png',
  },
};

export default {
  info,
  dataForm,
  hotArea: true,
};
