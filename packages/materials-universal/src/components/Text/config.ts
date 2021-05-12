const info = {
  name: '文本',
  desc: '纯文本组件',
  author: 'Aedron@github',
};

const dataForm = {
  text: {
    title: 'Text Content',
    type: 'string',
    widget: 'textarea',
    default: '请输入文本',
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
