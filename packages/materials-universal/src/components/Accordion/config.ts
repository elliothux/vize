const info = {
  name: 'Accordion',
  desc: '可展开/折叠的 Accordion 容器组件',
  author: 'Aedron@github',
};

const dataForm = {
  title: {
    title: '标题',
    type: 'string',
    widget: 'textarea',
    required: true,
  },
  defaultExpand: {
    title: '默认展开',
    type: 'boolean',
    default: false,
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
  isContainer: true,
};
