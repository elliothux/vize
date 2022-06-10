const info = {
  name: '弹窗容器',
  desc: '通用弹窗容器组件',
  author: 'Aedron@github',
};

const dataForm = {
  closeButton: {
    title: '关闭按钮',
    type: 'boolean',
    default: true,
  },
  maskClose: {
    title: '点击蒙层可关闭',
    type: 'boolean',
    default: true,
  },
};

const styleForm = {
  maskBackground: {
    title: '蒙层背景色',
    type: 'string',
    default: 'rgba(0, 0, 0, 0.7)',
    'x-component': 'Color',
    'x-props': {
      format: 'rgba',
    },
  },
};

const enableStyleGroup = {
  transform: {
    borderRadius: 6,
  },
  border: true,
  background: {
    color: '#fff',
  },
};

export default {
  info,
  dataForm,
  styleForm,
  enableStyleGroup,
  onEvents: [
    { displayName: '切换弹窗', eventName: 'toggle' },
    { displayName: '打开弹窗', eventName: 'open' },
    { displayName: '关闭弹窗', eventName: 'close' },
  ],
  emitEvents: [
    { displayName: '打开弹窗', eventName: 'open' },
    { displayName: '关闭弹窗', eventName: 'close' },
  ],
  isContainer: true,
  hideEditMask: true,
};
