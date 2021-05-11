const info = {
  name: '按钮',
  desc: '基础按钮',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '按钮文字',
    default: '按钮',
    type: 'string',
    required: true,
  },
};

const enableStyleGroup = {
  size: true,
  transform: {
    radius: 32,
  },
  text: {
    color: '#fff',
  },
  border: true,
  background: {
    color: '#fb9f34',
  },
  margin: {
    top: 12,
    bottom: 12,
    left: 32,
    right: 32,
  },
  padding: true,
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
