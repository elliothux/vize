const info = {
  name: '文本',
  desc: '普通文本组件',
  author: 'aedron@github',
};

const dataForm = {
  content: {
    title: '文本内容',
    type: 'textarea',
    default: 'Hello',
    required: true,
  },
};

const enableStyleGroup = {
  size: true,
  transform: true,
  text: true,
  border: true,
  background: true,
  margin: {
    top: 12,
    bottom: 12,
  },
  padding: {
    left: 8,
    right: 8,
  },
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
