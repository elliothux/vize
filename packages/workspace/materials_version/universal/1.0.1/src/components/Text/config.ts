const info = {
  name: '文本',
  desc: '纯文本组件',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '文本内容',
    type: 'textarea',
    default: '输入文本内容...',
  },
};
/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */
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
  emitEvents: [{ eventName: 'length', displayName: '长度大于10' }],
};
