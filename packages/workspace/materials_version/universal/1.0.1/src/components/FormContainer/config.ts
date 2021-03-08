const info = {
  name: '表单容器',
  desc: '用于留资等需求',
  author: 'aedron@github',
};

const dataForm = {
  buttonText: {
    title: '提交按钮文字',
    default: '提交',
    type: 'string',
    required: true,
  },
  successButtonText: {
    title: '提交成功按钮文字',
    default: '已提交',
    type: 'string',
    required: true,
  },
  successTitle: {
    title: '成功提示标题',
    default: '成功',
    type: 'string',
    required: true,
    'x-props': {
      placeholder: '消息(Toast)不支持显示',
    },
  },
  successText: {
    title: '成功提示文字',
    default: '提交成功',
    type: 'textarea',
    required: true,
  },
  messageType: {
    title: '提示方式',
    type: 'radio',
    default: 'toast',
    enum: [
      { value: 'toast', label: '消息(Toast)' },
      { value: 'alert', label: '弹窗(Alert)' },
    ],
    required: true,
  },
  jumpURL: {
    title: '成功跳转链接',
    type: 'string',
    'x-rules': 'url',
    'x-props': {
      placeholder: '为空则不跳转',
    },
  },
  forbidResubmit: {
    title: '限制重复提交',
    type: 'boolean',
    default: true,
  },
};

const enableStyleGroup = {
  transform: true,
  margin: true,
  padding: {
    top: 16,
    bottom: 16,
    left: 12,
    right: 12,
  },
  border: true,
  background: {
    color: '#fff',
  },
};

const styleForm = {
  buttonTextColor: {
    title: '按钮文本颜色',
    type: 'color',
    default: '#fff',
    required: true,
  },
  buttonBackgroundColor: {
    title: '按钮背景颜色',
    type: 'color',
    default: '#08cb6a',
    required: true,
  },
};

export default {
  info,
  dataForm,
  styleForm,
  enableStyleGroup,
  emitEvents: [{ eventName: 'submitSuccess', displayName: '提交成功' }],
  onEvents: [{ eventName: 'submit', displayName: '提交表单' }],
  isContainer: true,
};
