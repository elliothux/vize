const info = {
  name: '按钮',
  desc: '通用按钮组件',
  author: 'aedron@github',
};

const dataForm = {
  text: {
    title: '按钮文字',
    default: '按钮',
    type: 'string',
  },
};

const enableStyleGroup = {
  size: true,
  transform: { radius: 4 },
  text: { color: '#FFFFFF', fontSize: 14, lineHeight: 32 },
  border: true,
  background: { color: '#fb9f34' },
  margin: { top: 16, right: 'auto', bottom: 16, left: 'auto' },
  padding: { top: 0, right: 20, bottom: 0, left: 20 },
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
