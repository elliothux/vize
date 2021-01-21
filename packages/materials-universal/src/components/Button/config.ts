const info = {
  name: '按钮',
  desc: '基础按钮',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '按钮文字',
    default: '按钮',
    type: 'txt',
  },
};
const enableWrapperStyleGroup = {
  background: {
    color: 'transparent',
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
  emitEvents: [{ displayName: 'emit测试', eventName: 'test' }],
  onEvents: [{ displayName: 'on测试', eventName: 'test' }],
  enableWrapperStyleGroup,
  enableStyleGroup,
};
