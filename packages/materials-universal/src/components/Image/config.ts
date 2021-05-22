const info = {
  name: '图片',
  desc: '纯图片组件（支持热区）',
  author: 'Adron@github',
};

const dataForm = {
  src: {
    title: '图片',
    type: 'string',
    'x-component': 'Image',
    required: true,
    default: 'https://img.alicdn.com/tfs/TB1PibhR4D1gK0jSZFsXXbldVXa-512-416.png',
  },
};

const enableStyleGroup = {
  size: true,
  transform: true,
  border: true,
  margin: {
    left: 'auto',
    right: 'auto',
  },
  padding: true,
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
  hotArea: true,
};
