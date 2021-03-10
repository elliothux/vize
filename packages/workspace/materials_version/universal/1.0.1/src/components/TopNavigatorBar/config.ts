const info = {
  name: '顶部导航',
  desc: '',
  author: 'aedron@github',
};

const dataForm = {
  items: {
    title: '导航项',
    type: 'array',
    default: ['首页'],
    items: {
      title: '标题',
      type: 'string',
    },
  },
};

const enableStyleGroup = {
  position: {
    top: 0,
    left: 0,
  },
};

export default {
  info,
  // dataForm,
  enableStyleGroup,
};
