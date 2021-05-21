const info = {
  name: 'Accordion',
  desc: '可展开/折叠的 Accordion 容器组件',
  author: 'Aedron@github',
};

const dataForm = {
  title: {
    title: '标题',
    type: 'string',
    default: '标题描述',
    required: true,
  },
  defaultExpand: {
    title: '默认展开',
    type: 'boolean',
    default: true,
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
  onEvents: [
    { displayName: '切换展开/折叠', eventName: 'toggle' },
    { displayName: '展开', eventName: 'open' },
    { displayName: '折叠', eventName: 'close' },
  ],
  isContainer: true,
};
